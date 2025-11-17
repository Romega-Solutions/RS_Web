#!/bin/bash

echo "🐳 Building Romega Solutions Docker Image..."
docker build -t romega-solutions-website:latest .

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build complete!"
    echo ""
    echo "🚀 To run the container:"
    echo "   docker run -d -p 8080:80 --name romega-website romega-solutions-website:latest"
    echo ""
    echo "🌐 Access the website at: http://localhost:8080"
    echo ""
    echo "📊 To view logs:"
    echo "   docker logs romega-website"
    echo ""
    echo "🛑 To stop:"
    echo "   docker stop romega-website && docker rm romega-website"
else
    echo ""
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi
