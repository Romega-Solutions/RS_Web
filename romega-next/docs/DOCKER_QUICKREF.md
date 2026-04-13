# 🐳 Docker Quick Reference - Romega Solutions

## 🚀 Quick Start (30 seconds)
```bash
# Build and run everything
docker-compose up -d

# Check status
docker ps

# View site
# Open browser: http://localhost:3000
```

## 📋 Essential Commands

### Build & Run
```bash
# Build image
docker-compose build

# Start (detached)
docker-compose up -d

# Start (with logs)
docker-compose up

# Rebuild without cache
docker-compose build --no-cache
```

### Monitor & Debug
```bash
# View logs (follow)
docker-compose logs -f

# View last 100 lines
docker-compose logs --tail=100

# Check health
curl http://localhost:3000/api/health

# Resource usage
docker stats romega-solutions-website

# Enter container
docker exec -it romega-solutions-website sh
```

### Stop & Clean
```bash
# Stop container
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Remove image
docker rmi romega-solutions-website

# Clean everything
docker system prune -a
```

## 🔍 Health Checks
```bash
# Quick check
docker ps  # Look for "(healthy)"

# Detailed check
docker inspect romega-solutions-website | grep -A 10 Health

# Test endpoint
curl http://localhost:3000/api/health
# Response: {"status":"healthy",...}
```

## 📊 Image Info
```bash
# Size and details
docker images romega-solutions-website

# Layer history
docker history romega-solutions-website

# Detailed inspection
docker inspect romega-solutions-website
```

## 🐛 Troubleshooting

### Port in Use
```bash
# Windows
netstat -ano | findstr :3000

# Linux/macOS
lsof -i :3000

# Fix: Change port in docker-compose.yaml
ports:
  - "8080:3000"
```

### Container Won't Start
```bash
# Check logs
docker-compose logs

# Common issues:
# 1. Docker Desktop not running
# 2. Port 3000 in use
# 3. Insufficient resources (memory/CPU)
```

### Build Fails
```bash
# Clean build
docker-compose down
docker system prune -a -f
docker-compose build --no-cache
```

### Still Issues?
```bash
# Full reset
docker-compose down -v
docker system prune -a -f
docker volume prune -f
docker network prune -f

# Rebuild from scratch
docker-compose up -d --build --force-recreate
```

## 📁 Files Overview
```
├── Dockerfile              # Multi-stage build config
├── docker-compose.yaml     # Service orchestration
├── .dockerignore          # Exclude files from build
├── DOCKER.md              # Full documentation
├── DOCKER_TESTING.md      # Testing guide
└── script/
    ├── docker-build.sh    # Linux/macOS build script
    └── docker-build.bat   # Windows build script
```

## 🎯 Best Practices

### ✅ DO
- Use docker-compose for local development
- Check logs regularly: `docker-compose logs -f`
- Monitor resources: `docker stats`
- Keep images updated: `docker-compose pull`
- Clean up regularly: `docker system prune`

### ❌ DON'T
- Don't commit .env files
- Don't run as root
- Don't expose sensitive ports
- Don't skip health checks
- Don't ignore security updates

## 🔐 Security Features Enabled
- ✅ Non-root user (uid 1001)
- ✅ Read-only filesystem
- ✅ Minimal capabilities
- ✅ Resource limits
- ✅ Security scanning ready
- ✅ No new privileges

## 📈 Performance Metrics

### Expected Values
```
Image Size:      200-300MB
Memory Usage:    150-200MB (idle)
CPU Usage:       < 2% (idle)
Startup Time:    5-15 seconds
Build Time:      30-60s (cached)
Response Time:   < 100ms
```

### Monitor
```bash
# Real-time monitoring
docker stats romega-solutions-website

# Expected output:
# CONTAINER    CPU %    MEM USAGE / LIMIT     MEM %
# romega...    1.5%     180MB / 512MB        35%
```

## 🌐 URLs

### Local Development
- **Website**: http://localhost:3000
- **Health**: http://localhost:3000/api/health

### Production (when deployed)
- Update docker-compose.yaml with production URLs
- Configure SSL/TLS certificates
- Use reverse proxy (nginx/Traefik)

## 🔄 Update Workflow

### Code Changes
```bash
# 1. Make changes to files
# 2. Rebuild and restart
docker-compose up -d --build

# 3. Check logs
docker-compose logs -f
```

### Dependency Changes
```bash
# 1. Update package.json
# 2. Rebuild without cache
docker-compose build --no-cache

# 3. Restart
docker-compose up -d
```

## 📞 Support

### Documentation
- Full guide: [DOCKER.md](DOCKER.md)
- Testing: [DOCKER_TESTING.md](DOCKER_TESTING.md)

### Common Solutions
1. **Won't start**: Check Docker Desktop is running
2. **Port conflict**: Change port in docker-compose.yaml
3. **Build fails**: Try `--no-cache` flag
4. **Slow build**: Check .dockerignore file
5. **High memory**: Reduce limits in docker-compose.yaml

### Need Help?
```bash
# Check Docker status
docker version
docker info

# Check container status
docker ps -a
docker logs romega-solutions-website

# System info
docker system df
```

## 🎓 Learning Resources
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Next.js Docker](https://nextjs.org/docs/deployment#docker-image)
- [Security Best Practices](https://docs.docker.com/develop/security-best-practices/)

---

**Quick Tip**: Bookmark this page for fast reference! 🔖

**Last Updated**: February 2026
