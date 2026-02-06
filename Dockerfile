# Use official nginx alpine image for smaller size and better security
FROM nginx:alpine

# Security: Run as non-root user
RUN addgroup -g 1001 -S nginx-app && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx-app -g nginx-app nginx-app

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Security: Remove unnecessary packages and files
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
    curl \
    ca-certificates && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

# Copy all website files to nginx html directory
COPY --chown=nginx-app:nginx-app pages/ ./pages/
COPY --chown=nginx-app:nginx-app assets/ ./assets/
COPY --chown=nginx-app:nginx-app js/ ./js/

# Copy index.html to root if it exists in pages
RUN if [ -f pages/index.html ]; then cp pages/index.html .; fi

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Security: Set proper file permissions
RUN chown -R nginx-app:nginx-app /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx-app:nginx-app /var/cache/nginx && \
    chown -R nginx-app:nginx-app /var/log/nginx && \
    chown -R nginx-app:nginx-app /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx-app:nginx-app /var/run/nginx.pid

# Security: Modify nginx config to run as non-root
RUN sed -i 's/user  nginx;/user  nginx-app;/g' /etc/nginx/nginx.conf

# Security labels
LABEL maintainer="Romega Solutions" \
      version="1.0" \
      description="Secure Romega Solutions website" \
      security.hardened="true"

# Expose port 80 (Note: In production, use 443 with HTTPS)
EXPOSE 80

# Health check with improved security
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Security: Run as non-root user
USER nginx-app

# Start nginx
CMD ["nginx", "-g", "daemon off;"]