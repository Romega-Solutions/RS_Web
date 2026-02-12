#!/bin/bash

# Docker Build Script for Romega Solutions Website
# Purpose: Automated, optimized Docker build with validation

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="romega-solutions-website"
IMAGE_TAG="latest"
CONTAINER_NAME="romega-solutions-website"
PORT=3000

# Banner
echo -e "${BLUE}╔═════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Romega Solutions - Docker Build Script        ║${NC}"
echo -e "${BLUE}╚═════════════════════════════════════════════════════╝${NC}"
echo ""

# Function: Print section header
print_section() {
    echo -e "\n${YELLOW}▶ $1${NC}"
}

# Function: Print success message
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function: Print error message and exit
print_error() {
    echo -e "${RED}✗ Error: $1${NC}"
    exit 1
}

# Check if Docker is installed
print_section "Checking prerequisites..."
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
fi
print_success "Docker is installed"

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    print_error "Docker daemon is not running. Please start Docker."
fi
print_success "Docker daemon is running"

# Stop and remove existing container (if exists)
print_section "Cleaning up existing containers..."
if docker ps -a | grep -q $CONTAINER_NAME; then
    echo "Stopping existing container..."
    docker stop $CONTAINER_NAME 2>/dev/null || true
    echo "Removing existing container..."
    docker rm $CONTAINER_NAME 2>/dev/null || true
    print_success "Cleanup completed"
else
    echo "No existing containers found"
fi

# Remove old images (optional - preserve cache by default)
if [ "$1" == "--no-cache" ]; then
    print_section "Removing old images (--no-cache mode)..."
    docker rmi $IMAGE_NAME:$IMAGE_TAG 2>/dev/null || true
    print_success "Old images removed"
fi

# Build the Docker image
print_section "Building Docker image..."
echo "Image: $IMAGE_NAME:$IMAGE_TAG"
echo "Context: $(pwd)"
echo ""

BUILD_START=$(date +%s)

if [ "$1" == "--no-cache" ]; then
    docker build --no-cache -t $IMAGE_NAME:$IMAGE_TAG . || print_error "Docker build failed"
else
    docker build -t $IMAGE_NAME:$IMAGE_TAG . || print_error "Docker build failed"
fi

BUILD_END=$(date +%s)
BUILD_TIME=$((BUILD_END - BUILD_START))

print_success "Image built successfully in ${BUILD_TIME}s"

# Display image details
print_section "Image details..."
IMAGE_SIZE=$(docker images $IMAGE_NAME:$IMAGE_TAG --format "{{.Size}}")
echo "  Name: $IMAGE_NAME:$IMAGE_TAG"
echo "  Size: $IMAGE_SIZE"
echo "  Build time: ${BUILD_TIME}s"

# Check image layers
LAYER_COUNT=$(docker history $IMAGE_NAME:$IMAGE_TAG --no-trunc | wc -l)
echo "  Layers: $LAYER_COUNT"

# Security scan (if available)
if command -v trivy &> /dev/null; then
    print_section "Running security scan..."
    trivy image --severity HIGH,CRITICAL $IMAGE_NAME:$IMAGE_TAG
elif command -v docker &> /dev/null && docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy --version &> /dev/null; then
    print_section "Running security scan with Trivy..."
    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
        aquasec/trivy image --severity HIGH,CRITICAL $IMAGE_NAME:$IMAGE_TAG
else
    echo -e "${YELLOW}ℹ Security scan skipped (Trivy not installed)${NC}"
fi

# Verify the image
print_section "Verifying image..."
if ! docker image inspect $IMAGE_NAME:$IMAGE_TAG &> /dev/null; then
    print_error "Image verification failed"
fi
print_success "Image verified"

# Check for dangling images
DANGLING_COUNT=$(docker images -f "dangling=true" -q | wc -l)
if [ "$DANGLING_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}ℹ Found $DANGLING_COUNT dangling images${NC}"
    read -p "Do you want to remove them? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker image prune -f
        print_success "Dangling images removed"
    fi
fi

# Final summary
echo ""
echo -e "${BLUE}╔═════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              Build Summary                         ║${NC}"
echo -e "${BLUE}╠═════════════════════════════════════════════════════╣${NC}"
echo -e "${BLUE}║${NC} Image: $IMAGE_NAME:$IMAGE_TAG"
echo -e "${BLUE}║${NC} Size: $IMAGE_SIZE"
echo -e "${BLUE}║${NC} Build Time: ${BUILD_TIME}s"
echo -e "${BLUE}║${NC} Status: ${GREEN}SUCCESS${NC}"
echo -e "${BLUE}╚═════════════════════════════════════════════════════╝${NC}"
echo ""

# Next steps
print_section "Next steps:"
echo "  1. Run with Docker Compose:"
echo -e "     ${BLUE}docker-compose up -d${NC}"
echo ""
echo "  2. Or run manually:"
echo -e "     ${BLUE}docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME:$IMAGE_TAG${NC}"
echo ""
echo "  3. View logs:"
echo -e "     ${BLUE}docker-compose logs -f${NC}"
echo ""
echo "  4. Check health:"
echo -e "     ${BLUE}curl http://localhost:$PORT/api/health${NC}"
echo ""

print_success "Build complete!"
