# Docker Setup for Romega Solutions Website

## Overview
This Next.js application is containerized using Docker with **multi-stage builds** following industry best practices for security, performance, and minimal image size.

## Architecture

### Multi-Stage Build Process
1. **Dependencies Stage**: Installs production dependencies only
2. **Builder Stage**: Builds the Next.js application with optimizations
3. **Runner Stage**: Creates minimal production image with only runtime files

### Key Features
- ✅ **Alpine Linux** - Minimal base image (~5MB vs ~100MB for standard Node)
- ✅ **Multi-stage builds** - Reduces final image size by 70-80%
- ✅ **Layer caching** - Optimized for fast rebuilds
- ✅ **Security hardened** - Non-root user, minimal privileges
- ✅ **Production optimized** - Standalone output, tree-shaking
- ✅ **Health checks** - Automated container health monitoring

## Image Size Comparison
- **Without optimization**: ~1.2GB
- **With multi-stage build**: ~200-300MB (4x smaller)
- **Standalone output**: Only includes necessary runtime files

## Quick Start

### Build and Run with Docker Compose (Recommended)
```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Build Manually
```bash
# Build the image
docker build -t romega-solutions-website .

# Run the container
docker run -d \
  --name romega-website \
  -p 3000:3000 \
  --user 1001:1001 \
  --read-only \
  --security-opt no-new-privileges:true \
  romega-solutions-website
```

## Configuration

### Ports
- **Container Port**: 3000 (Next.js)
- **Host Port**: 3000 (configurable in docker-compose.yaml)

### Environment Variables
Set in `docker-compose.yaml` or pass via `-e` flag:
```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

### Resource Limits (docker-compose.yaml)
```yaml
limits:
  cpus: '1.0'      # Max 1 CPU core
  memory: 512M     # Max 512MB RAM
reservations:
  cpus: '0.5'      # Min 0.5 CPU cores
  memory: 256M     # Min 256MB RAM
```

## Security Features

### 1. Non-Root User
Container runs as user `1001` (nextjs) instead of root:
```dockerfile
USER nextjs
```

### 2. Read-Only Filesystem
Prevents malicious file modifications:
```yaml
read_only: true
```

### 3. Minimal Capabilities
Drops all Linux capabilities except essential ones:
```yaml
cap_drop: [ALL]
cap_add: [CHOWN, SETGID, SETUID]
```

### 4. Temporary Filesystems
Isolated writable areas for cache:
```yaml
tmpfs:
  - /tmp:noexec,nosuid,size=100m
  - /app/.next/cache:noexec,nosuid,size=200m
```

### 5. No New Privileges
Prevents privilege escalation:
```yaml
security_opt: [no-new-privileges:true]
```

## Health Checks

### Endpoint
`GET /api/health`

Response:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-12T10:30:45.123Z",
  "service": "romega-solutions-website",
  "uptime": 3600
}
```

### Docker Health Check
Configured in both `Dockerfile` and `docker-compose.yaml`:
- **Interval**: 30s
- **Timeout**: 5s
- **Retries**: 3
- **Start Period**: 40s

Check health status:
```bash
docker ps
# Look for "(healthy)" status

docker inspect romega-solutions-website | grep -A 10 Health
```

## Optimization Details

### 1. Standalone Output
Next.js standalone mode includes only necessary files:
```typescript
// next.config.ts
output: 'standalone'
```

### 2. Layer Caching
Dependencies are cached separately from source code:
```dockerfile
# Cached layer (changes rarely)
COPY romega-next/package*.json ./
RUN npm ci

# Application code (changes frequently)  
COPY romega-next/ .
```

### 3. Production Dependencies Only
```dockerfile
RUN npm ci --only=production --ignore-scripts
```

### 4. Clean Cache
```dockerfile
RUN npm cache clean --force
```

## Build Performance

### First Build
- Time: ~2-3 minutes
- Downloads: All dependencies + base images

### Subsequent Builds (with cache)
- Time: ~30-60 seconds
- Only rebuilds changed layers

### Optimization Tips
1. Don't modify `package.json` unless needed (breaks cache)
2. Use `.dockerignore` to exclude unnecessary files
3. Keep `node_modules` out of build context

## Troubleshooting

### Container Won't Start
```bash
# Check logs
docker-compose logs romega-website

# Common issues:
# - Port 3000 already in use
# - Insufficient memory
# - Health check failing
```

### Health Check Failing
```bash
# Test health endpoint manually
docker exec romega-solutions-website curl http://localhost:3000/api/health

# Check if Next.js is running
docker exec romega-solutions-website ps aux
```

### Permission Errors
```bash
# Ensure tmpfs volumes are configured
docker inspect romega-solutions-website | grep -A 20 Tmpfs
```

### Image Too Large
```bash
# Check image size
docker images romega-solutions-website

# Should be ~200-300MB
# If larger, ensure:
# 1. .dockerignore is configured
# 2. node_modules not copied
# 3. Using standalone output
```

## Development vs Production

### Development (Current Setup)
```bash
cd romega-next
npm run dev
```

### Production (Docker)
```bash
docker-compose up -d
```

### Why Two Setups?
- **Development**: Hot reload, faster iteration
- **Production**: Optimized, secure, reproducible

## Monitoring

### View Logs
```bash
# Follow logs
docker-compose logs -f romega-website

# Last 100 lines
docker-compose logs --tail=100 romega-website
```

### Resource Usage
```bash
# Real-time stats
docker stats romega-solutions-website

# Memory, CPU, Network, Disk I/O
```

### Container Info
```bash
# Detailed inspection
docker inspect romega-solutions-website

# Check user
docker exec romega-solutions-website whoami
# Output: nextjs
```

## Best Practices Implemented

✅ **Multi-stage builds** - Minimal image size  
✅ **Alpine Linux** - Security and size  
✅ **Non-root user** - Least privilege principle  
✅ **Read-only filesystem** - Immutable infrastructure  
✅ **Health checks** - Self-healing containers  
✅ **Resource limits** - Predictable performance  
✅ **Layer caching** - Fast builds  
✅ **Security scanning** - Minimal attack surface  
✅ **.dockerignore** - Clean build context  
✅ **Standalone output** - Tree-shaken dependencies  

## Next Steps

### 1. Add HTTPS (Production)
```yaml
# Add nginx reverse proxy or Traefik
# Configure SSL/TLS certificates
```

### 2. Container Registry
```bash
# Tag and push to registry
docker tag romega-solutions-website:latest registry.example.com/romega:latest
docker push registry.example.com/romega:latest
```

### 3. Orchestration
```bash
# Deploy to Kubernetes, Docker Swarm, or AWS ECS
# Example: kubectl apply -f k8s/deployment.yaml
```

## Support
For issues or questions:
1. Check logs: `docker-compose logs`
2. Review Docker documentation: [docs/DOCKER.md](docs/DOCKER.md)
3. Contact: DevOps team

---

**Last Updated**: February 2026  
**Maintained by**: Romega Solutions DevOps Team
