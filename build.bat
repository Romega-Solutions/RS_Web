@echo off
echo 🐳 Building Romega Solutions Docker Image...
docker build -t romega-solutions-website:latest .

if %errorlevel% equ 0 (
    echo.
    echo ✅ Build complete!
    echo.
    echo 🚀 To run the container:
    echo    docker run -d -p 8080:80 --name romega-website romega-solutions-website:latest
    echo.
    echo 🌐 Access the website at: http://localhost:8080
    echo.
    echo 📊 To view logs:
    echo    docker logs romega-website
    echo.
    echo 🛑 To stop:
    echo    docker stop romega-website
    echo    docker rm romega-website
) else (
    echo.
    echo ❌ Build failed. Please check the error messages above.
    exit /b 1
)
