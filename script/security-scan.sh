#!/bin/bash
# ==============================================================================
# Docker Security Scanning Script for Romega Solutions Website
# ==============================================================================
# This script performs security scanning on Docker images using Trivy
# Trivy is a comprehensive vulnerability scanner for containers

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

IMAGE_NAME="romega-solutions-website"
IMAGE_TAG="latest"
FULL_IMAGE="${IMAGE_NAME}:${IMAGE_TAG}"

echo -e "${BLUE}=============================================================${NC}"
echo -e "${BLUE}    Romega Solutions - Docker Security Scan${NC}"
echo -e "${BLUE}=============================================================${NC}"
echo ""

# Check if Trivy is installed
if ! command -v trivy &> /dev/null; then
    echo -e "${YELLOW}Trivy is not installed. Installing Trivy...${NC}"
    
    # Detect OS and install Trivy
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux installation
        sudo apt-get update
        sudo apt-get install -y wget apt-transport-https gnupg lsb-release
        wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
        echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
        sudo apt-get update
        sudo apt-get install -y trivy
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS installation
        brew install aquasecurity/trivy/trivy
    else
        echo -e "${RED}Unsupported OS. Please install Trivy manually from: https://aquasecurity.github.io/trivy/${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Trivy installed successfully!${NC}"
    echo ""
fi

# Check if Docker image exists
if ! docker image inspect "$FULL_IMAGE" &> /dev/null; then
    echo -e "${YELLOW}Image $FULL_IMAGE not found. Building it first...${NC}"
    docker-compose build
    echo ""
fi

echo -e "${BLUE}Starting security scan of ${FULL_IMAGE}...${NC}"
echo ""

# Scan 1: Vulnerabilities in OS packages and application dependencies
echo -e "${YELLOW}[1/4] Scanning for OS and library vulnerabilities...${NC}"
trivy image \
    --severity HIGH,CRITICAL \
    --exit-code 0 \
    --format table \
    "$FULL_IMAGE"
echo ""

# Scan 2: Misconfigurations (Dockerfile best practices)
echo -e "${YELLOW}[2/4] Scanning for Dockerfile misconfigurations...${NC}"
trivy config \
    --severity HIGH,CRITICAL \
    --exit-code 0 \
    ./Dockerfile
echo ""

# Scan 3: Secret detection
echo -e "${YELLOW}[3/4] Scanning for exposed secrets...${NC}"
trivy filesystem \
    --severity HIGH,CRITICAL \
    --scanners secret \
    --exit-code 1 \
    .
echo ""

# Scan 4: Generate detailed JSON report
echo -e "${YELLOW}[4/4] Generating detailed security report...${NC}"
REPORT_FILE="security-report-$(date +%Y%m%d-%H%M%S).json"
trivy image \
    --format json \
    --output "$REPORT_FILE" \
    "$FULL_IMAGE"

if [ -f "$REPORT_FILE" ]; then
    echo -e "${GREEN}✓ Detailed report saved to: $REPORT_FILE${NC}"
else
    echo -e "${RED}✗ Failed to generate report${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}=============================================================${NC}"
echo -e "${BLUE}    Security Scan Summary${NC}"
echo -e "${BLUE}=============================================================${NC}"
echo -e "${GREEN}✓ OS/Library vulnerability scan completed${NC}"
echo -e "${GREEN}✓ Dockerfile configuration scan completed${NC}"
echo -e "${GREEN}✓ Secret detection scan completed${NC}"
echo -e "${GREEN}✓ Detailed report generated${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Review vulnerabilities in the output above"
echo -e "  2. Check the detailed report: $REPORT_FILE"
echo -e "  3. Update dependencies if critical issues found"
echo -e "  4. Re-scan after fixes"
echo ""
echo -e "${BLUE}Tip: Run 'trivy image --help' for more scanning options${NC}"
