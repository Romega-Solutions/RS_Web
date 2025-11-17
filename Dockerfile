# Use official nginx alpine image for smaller size
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy all website files to nginx html directory
COPY pages/ ./pages/
COPY assets/ ./assets/
COPY js/ ./js/

# Copy index.html to root if it exists in pages
RUN if [ -f pages/index.html ]; then cp pages/index.html .; fi

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]