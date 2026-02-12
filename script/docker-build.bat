@echo off
REM Docker Build Script for Romega Solutions Website (Windows)
REM Purpose: Automated, optimized Docker build with validation

setlocal enabledelayedexpansion

REM Configuration
set IMAGE_NAME=romega-solutions-website
set IMAGE_TAG=latest
set CONTAINER_NAME=romega-solutions-website
set PORT=3000

REM Colors (limited in CMD)
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "RED=[91m"
set "NC=[0m"

echo %BLUE%=========================================================%NC%
echo %BLUE%    Romega Solutions - Docker Build Script (Windows)    %NC%
echo %BLUE%=========================================================%NC%
echo.

REM Check if Docker is installed
echo %YELLOW%Checking prerequisites...%NC%
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo %RED%Error: Docker is not installed. Please install Docker Desktop.%NC%
    exit /b 1
)
echo %GREEN%Docker is installed%NC%

REM Check if Docker daemon is running
docker info >nul 2>nul
if %errorlevel% neq 0 (
    echo %RED%Error: Docker daemon is not running. Please start Docker Desktop.%NC%
    exit /b 1
)
echo %GREEN%Docker daemon is running%NC%

REM Stop and remove existing container (if exists)
echo.
echo %YELLOW%Cleaning up existing containers...%NC%
docker ps -a | findstr %CONTAINER_NAME% >nul 2>nul
if %errorlevel% equ 0 (
    echo Stopping existing container...
    docker stop %CONTAINER_NAME% >nul 2>nul
    echo Removing existing container...
    docker rm %CONTAINER_NAME% >nul 2>nul
    echo %GREEN%Cleanup completed%NC%
) else (
    echo No existing containers found
)

REM Check for no-cache flag
if "%~1"=="--no-cache" (
    echo.
    echo %YELLOW%Removing old images (--no-cache mode)...%NC%
    docker rmi %IMAGE_NAME%:%IMAGE_TAG% >nul 2>nul
    echo %GREEN%Old images removed%NC%
)

REM Build the Docker image
echo.
echo %YELLOW%Building Docker image...%NC%
echo Image: %IMAGE_NAME%:%IMAGE_TAG%
echo Context: %CD%
echo.

set BUILD_START=%time%

if "%~1"=="--no-cache" (
    docker build --no-cache -t %IMAGE_NAME%:%IMAGE_TAG% .
) else (
    docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
)

if %errorlevel% neq 0 (
    echo %RED%Error: Docker build failed%NC%
    exit /b 1
)

set BUILD_END=%time%
echo %GREEN%Image built successfully%NC%

REM Display image details
echo.
echo %YELLOW%Image details...%NC%
for /f "tokens=*" %%i in ('docker images %IMAGE_NAME%:%IMAGE_TAG% --format "{{.Size}}"') do set IMAGE_SIZE=%%i
echo   Name: %IMAGE_NAME%:%IMAGE_TAG%
echo   Size: %IMAGE_SIZE%

REM Verify the image
echo.
echo %YELLOW%Verifying image...%NC%
docker image inspect %IMAGE_NAME%:%IMAGE_TAG% >nul 2>nul
if %errorlevel% neq 0 (
    echo %RED%Error: Image verification failed%NC%
    exit /b 1
)
echo %GREEN%Image verified%NC%

REM Check for dangling images
echo.
set DANGLING_COUNT=0
for /f %%i in ('docker images -f "dangling=true" -q ^| find /c /v ""') do set DANGLING_COUNT=%%i
if !DANGLING_COUNT! gtr 0 (
    echo %YELLOW%Found !DANGLING_COUNT! dangling images%NC%
    set /p CLEANUP="Do you want to remove them? (y/n): "
    if /i "!CLEANUP!"=="y" (
        docker image prune -f >nul
        echo %GREEN%Dangling images removed%NC%
    )
)

REM Final summary
echo.
echo %BLUE%=========================================================%NC%
echo %BLUE%              Build Summary                             %NC%
echo %BLUE%=========================================================%NC%
echo  Image: %IMAGE_NAME%:%IMAGE_TAG%
echo  Size: %IMAGE_SIZE%
echo  Status: %GREEN%SUCCESS%NC%
echo %BLUE%=========================================================%NC%
echo.

REM Next steps
echo %YELLOW%Next steps:%NC%
echo   1. Run with Docker Compose:
echo      %BLUE%docker-compose up -d%NC%
echo.
echo   2. Or run manually:
echo      %BLUE%docker run -d -p %PORT%:%PORT% --name %CONTAINER_NAME% %IMAGE_NAME%:%IMAGE_TAG%%NC%
echo.
echo   3. View logs:
echo      %BLUE%docker-compose logs -f%NC%
echo.
echo   4. Check health:
echo      %BLUE%curl http://localhost:%PORT%/api/health%NC%
echo.
echo %GREEN%Build complete!%NC%
echo.

pause
