# Observability & Monitoring Stack Setup

## Overview

This project uses a complete observability stack for monitoring the Romega Solutions website:

- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization dashboards
- **Loki**: Log aggregation
- **Promtail**: Log collection agent

## 🚀 Quick Start

### Prerequisites

1. Docker and Docker Compose installed
2. Create environment files:

```bash
# Copy example environment file
cp .env.example .env.production

# Create secrets directory and files (optional)
mkdir -p secrets
echo "your-smtp-password" > secrets/smtp_password.txt
echo "your-resend-key" > secrets/resend_api_key.txt
echo "your-api-keys" > secrets/api_keys.txt
```

### Start Everything

```bash
# Start all services (website + monitoring stack)
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f romega-website
```

## 📊 Accessing the Monitoring Stack

Once running, access these services:

| Service | URL | Default Credentials |
|---------|-----|---------------------|
| **Website** | http://localhost:3000 | N/A |
| **Grafana** | http://localhost:3001 | admin / admin123 |
| **Prometheus** | http://localhost:9090 | No auth |
| **Loki** | http://localhost:3100 | No auth (internal) |

### First Login to Grafana

1. Go to http://localhost:3001
2. Login with: `admin` / `admin123`
3. (Optional) Change password when prompted
4. Navigate to **Dashboards** → **Romega Solutions - Website Overview**

## 📈 Available Metrics

The application exposes metrics at `/api/metrics` endpoint:

```bash
# View raw metrics (requires auth token if configured)
curl http://localhost:3000/api/metrics

# With authentication
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/metrics
```

### Metrics Captured:

- **http_requests_total**: Total HTTP requests
- **http_request_duration_seconds**: Request latency (p50, p95, p99)
- **health_check_status**: Application health (1=healthy, 0=unhealthy)
- **nodejs_heap_size_bytes**: Memory usage
- **nodejs_uptime_seconds**: Application uptime

## 🔍 Viewing Logs

### Option 1: Grafana (Recommended)

1. Open Grafana: http://localhost:3001
2. Go to **Explore** (⌘+shift+X or compass icon)
3. Select **Loki** datasource
4. Use LogQL queries:

```logql
# All logs from the website
{container_name="romega-solutions-website"}

# Error logs only
{container_name="romega-solutions-website"} |= "error"

# Last 100 logs
{container_name="romega-solutions-website"} | limit 100
```

### Option 2: Docker Logs

```bash
# View logs directly
docker logs romega-solutions-website

# Follow logs in real-time
docker logs -f romega-solutions-website

# Last 100 lines
docker logs --tail 100 romega-solutions-website
```

## 📊 Pre-Built Dashboards

### Romega Solutions - Website Overview

Located at: `monitoring/grafana/dashboards/romega-overview.json`

**Panels included:**
- HTTP Request Rate (requests/second)
- P95 Response Time (latency)
- Memory Usage (heap size)
- Application Health Status

**To customize:**
1. Open dashboard in Grafana
2. Click panel title → Edit
3. Modify queries or visualization
4. Save dashboard

## 🔒 Security Configuration

### Metrics Endpoint Authentication

Protect the `/api/metrics` endpoint in production:

```bash
# .env.production
METRICS_AUTH_TOKEN=generate-a-secure-random-token-here
```

Update Prometheus config to use the token:

```yaml
# monitoring/prometheus.yml
scrape_configs:
  - job_name: 'romega-website'
    bearer_token: 'your-secure-token-here'
```

### Grafana Security

**Change default password immediately in production!**

```bash
# Update docker-compose.yaml
environment:
  - GF_SECURITY_ADMIN_PASSWORD=your-strong-password
```

Or change after first login:
1. Profile → Change Password

### Disable Public Access

To only allow internal monitoring access:

```yaml
# docker-compose.yaml - remove port mappings
services:
  prometheus:
    # ports:
    #   - "9090:9090"  # Comment this out
    
  grafana:
    # Only expose Grafana, hide Prometheus
    ports:
      - "3001:3000"
```

## 🛠️ Troubleshooting

### Prometheus can't scrape metrics

```bash
# Check if metrics endpoint is accessible
curl http://localhost:3000/api/metrics

# Check Prometheus targets
# Open http://localhost:9090/targets
# All should show "UP" status
```

**Fix:** Ensure `ENABLE_METRICS=true` in environment

### Grafana shows "No data"

1. Check datasources: Configuration → Data Sources
2. Test Prometheus connection
3. Verify time range in dashboard (top right)
4. Check if website has received traffic

### Loki not receiving logs

```bash
# Check Promtail logs
docker logs romega-promtail

# Verify Loki is running
docker ps | grep loki

# Test Loki API
curl http://localhost:3100/ready
```

### High memory usage

Adjust retention and limits:

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 30s  # Increase from 15s

# monitoring/loki-config.yml
limits_config:
  retention_period: 168h  # Reduce from 720h (30 days to 7 days)
```

## 📦 Data Persistence

All monitoring data is stored in Docker volumes:

```bash
# List volumes
docker volume ls | grep romega

# Backup volumes
docker run --rm -v romega-solutions-website_prometheus-data:/data \
  -v $(pwd):/backup alpine tar czf /backup/prometheus-backup.tar.gz /data

# Remove all data (fresh start)
docker-compose down -v
```

## 🎯 Alerting (Future Enhancement)

To add alerting:

1. Set up **Alertmanager** for Prometheus
2. Configure alert rules in `prometheus.yml`
3. Add notification channels in Grafana

Example alert rule:

```yaml
# monitoring/alerts.yml
groups:
  - name: website_alerts
    rules:
      - alert: HighResponseTime
        expr: http_request_duration_seconds{quantile="0.95"} > 1
        for: 5m
        annotations:
          summary: "High response time detected"
```

## 🔄 Updating the Stack

```bash
# Pull latest images
docker-compose pull

# Recreate containers with new images
docker-compose up -d --force-recreate

# Or update specific service
docker-compose up -d --no-deps grafana
```

## 📚 Resources for Beginners

### Prometheus
- [Getting Started](https://prometheus.io/docs/prometheus/latest/getting_started/)
- [Query Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)

### Grafana
- [Getting Started](https://grafana.com/docs/grafana/latest/getting-started/)
- [Dashboard Best Practices](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/best-practices/)

### Loki
- [LogQL Query Language](https://grafana.com/docs/loki/latest/logql/)
- [Log Aggregation Guide](https://grafana.com/docs/loki/latest/getting-started/)

## 🆘 Need Help?

**Common Questions:**

**Q: Should I use Prometheus or Grafana?**
A: Use both! Prometheus stores metrics, Grafana visualizes them.

**Q: Do I need all these services for development?**
A: No. You can disable monitoring services in development:
```bash
docker-compose up -d romega-website  # Only start the website
```

**Q: How much resources does this use?**
A: Approximately:
- Prometheus: 200-500MB RAM
- Grafana: 100-200MB RAM  
- Loki: 100-300MB RAM
- Promtail: 50-100MB RAM
- **Total**: ~500MB-1GB RAM

**Q: Can I use this in production?**
A: Yes, but:
1. Change all default passwords
2. Add HTTPS/TLS
3. Configure proper retention periods
4. Set up backups
5. Enable authentication on all services

---

## Next Steps

1. ✅ Explore the default dashboard
2. ✅ Create custom dashboards for your needs
3. ✅ Set up alerts for critical metrics
4. ✅ Configure longer retention if needed
5. ✅ Integrate with external monitoring services (optional)

For more help, see [SECURITY_GUIDE.md](./SECURITY_GUIDE.md) and [DOCKER.md](./DOCKER.md)
