# Docker Verification and Testing Guide

## Quick Verification Checklist

### 1. Build Verification
```bash
# Check image exists
docker images romega-solutions-website

# Expected output:
# REPOSITORY                    TAG       SIZE
# romega-solutions-website     latest    200-300MB
```

### 2. Security Verification
```bash
# Verify non-root user
docker run --rm romega-solutions-website id
# Expected: uid=1001(nextjs) gid=1001(nodejs)

# Check capabilities
docker inspect romega-solutions-website | grep -A 10 CapDrop
# Expected: CapDrop: ["ALL"]

# Verify read-only filesystem
docker inspect romega-solutions-website | grep ReadonlyRootfs
# Expected: "ReadonlyRootfs": true
```

### 3. Runtime Verification
```bash
# Start container
docker-compose up -d

# Wait 10 seconds for startup
sleep 10

# Check container is healthy
docker ps
# Look for "(healthy)" status

# Test health endpoint
curl http://localhost:3000/api/health
# Expected: {"status":"healthy",...}

# Test homepage
curl http://localhost:3000/
# Expected: HTML response with status 200
```

### 4. Performance Verification
```bash
# Check resource usage
docker stats romega-solutions-website --no-stream

# Expected:
# - CPU: < 5% (idle)
# - Memory: < 200MB
```

### 5. Log Verification
```bash
# Check for errors
docker-compose logs romega-website | grep -i error

# No critical errors should appear

# Check startup logs
docker-compose logs romega-website | head -n 20
# Expected: "Ready" or "Listening on" messages
```

## Automated Test Script

### Linux/macOS
```bash
#!/bin/bash
# test-docker.sh

set -e

echo "Testing Docker setup..."

# Build
echo "1. Building image..."
docker-compose build

# Start
echo "2. Starting container..."
docker-compose up -d

# Wait
echo "3. Waiting for startup (30s)..."
sleep 30

# Test health
echo "4. Testing health endpoint..."
HEALTH=$(curl -s http://localhost:3000/api/health | grep -o "healthy")
if [ "$HEALTH" != "healthy" ]; then
    echo "❌ Health check failed"
    exit 1
fi
echo "✅ Health check passed"

# Test homepage
echo "5. Testing homepage..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)
if [ "$STATUS" != "200" ]; then
    echo "❌ Homepage test failed (status: $STATUS)"
    exit 1
fi
echo "✅ Homepage test passed"

# Check container health
echo "6. Checking container health status..."
CONTAINER_HEALTH=$(docker inspect romega-solutions-website | grep -o '"Status": "healthy"' | head -n 1)
if [ -z "$CONTAINER_HEALTH" ]; then
    echo "❌ Container not healthy"
    exit 1
fi
echo "✅ Container is healthy"

# Cleanup
echo "7. Cleaning up..."
docker-compose down

echo ""
echo "✅ All tests passed!"
```

### Windows (PowerShell)
```powershell
# test-docker.ps1

Write-Host "Testing Docker setup..." -ForegroundColor Blue

# Build
Write-Host "1. Building image..." -ForegroundColor Yellow
docker-compose build
if ($LASTEXITCODE -ne 0) { exit 1 }

# Start
Write-Host "2. Starting container..." -ForegroundColor Yellow
docker-compose up -d
if ($LASTEXITCODE -ne 0) { exit 1 }

# Wait
Write-Host "3. Waiting for startup (30s)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Test health
Write-Host "4. Testing health endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3000/api/health"
    if ($health.status -ne "healthy") {
        Write-Host "❌ Health check failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Health check passed" -ForegroundColor Green
} catch {
    Write-Host "❌ Health check failed: $_" -ForegroundColor Red
    exit 1
}

# Test homepage
Write-Host "5. Testing homepage..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing
    if ($response.StatusCode -ne 200) {
        Write-Host "❌ Homepage test failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Homepage test passed" -ForegroundColor Green
} catch {
    Write-Host "❌ Homepage test failed: $_" -ForegroundColor Red
    exit 1
}

# Cleanup
Write-Host "6. Cleaning up..." -ForegroundColor Yellow
docker-compose down

Write-Host ""
Write-Host "✅ All tests passed!" -ForegroundColor Green
```

## Common Issues and Solutions

### Issue 1: Build Fails with "COPY failed"
**Problem**: Files not found during copy
**Solution**: 
```bash
# Verify file structure
ls -la romega-next/

# Ensure you're building from project root
pwd  # Should show romega-solutions-website

# Clean build
docker-compose build --no-cache
```

### Issue 2: Health Check Keeps Failing
**Problem**: Container status shows "unhealthy"
**Solution**:
```bash
# Check logs
docker-compose logs romega-website

# Test health endpoint manually
docker exec romega-solutions-website curl http://localhost:3000/api/health

# Increase start_period in docker-compose.yaml
healthcheck:
  start_period: 60s  # Give more time for startup
```

### Issue 3: Port Already in Use
**Problem**: "Bind for 0.0.0.0:3000 failed: port is already allocated"
**Solution**:
```bash
# Find process using port 3000
# Windows:
netstat -ano | findstr :3000
# Linux/macOS:
lsof -i :3000

# Kill process or change port in docker-compose.yaml
ports:
  - "8080:3000"  # Map to different host port
```

### Issue 4: Permission Errors in Container
**Problem**: Permission denied errors in logs
**Solution**:
```bash
# Verify tmpfs volumes are mounted
docker inspect romega-solutions-website | grep -A 20 Tmpfs

# Check user
docker exec romega-solutions-website whoami
# Should output: nextjs

# Verify ownership
docker exec romega-solutions-website ls -la /app
```

### Issue 5: High Memory Usage
**Problem**: Container using > 500MB RAM
**Solution**:
```bash
# Check actual usage
docker stats romega-solutions-website

# Adjust limits in docker-compose.yaml
limits:
  memory: 384M  # Reduce if needed

# Check for memory leaks in logs
docker-compose logs | grep -i "memory\|heap"
```

## Performance Benchmarks

### Expected Build Times
- **First build**: 2-3 minutes (downloads all dependencies)
- **Cached build**: 30-60 seconds (only changed layers)
- **No-cache build**: 3-4 minutes (rebuilds everything)

### Expected Image Sizes
- **Base image** (node:20-alpine): ~140MB
- **Final image**: 200-300MB
- **Compressed**: ~80-120MB (when pushed to registry)

### Expected Runtime Performance
- **Startup time**: 5-15 seconds
- **Memory usage** (idle): 150-200MB
- **CPU usage** (idle): < 2%
- **Response time**: < 100ms (local)

## CI/CD Integration

### GitHub Actions Example
```yaml
# .github/workflows/docker.yml
name: Docker Build

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t romega-solutions-website .
      
      - name: Run tests
        run: |
          docker-compose up -d
          sleep 30
          curl -f http://localhost:3000/api/health
          docker-compose down
```

### GitLab CI Example
```yaml
# .gitlab-ci.yml
docker-build:
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE:latest
```

## Monitoring in Production

### Recommended Tools
1. **Prometheus** - Metrics collection
2. **Grafana** - Visualization
3. **ELK Stack** - Log aggregation
4. **Sentry** - Error tracking

### Key Metrics to Monitor
- Container health status
- Memory usage
- CPU usage
- Response times
- Error rates
- Restart count

---

**Last Updated**: February 2026
