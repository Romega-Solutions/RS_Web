@echo off
REM ==============================================================================
REM Docker Security Scanning Script for Romega Solutions Website (Windows)
REM ==============================================================================
REM This script performs security scanning on Docker images using Trivy

setlocal enabledelayedexpansion

set IMAGE_NAME=romega-solutions-website
set IMAGE_TAG=latest
set FULL_IMAGE=%IMAGE_NAME%:%IMAGE_TAG%

REM Colors (limited in CMD)
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "RED=[91m"
set "NC=[0m"

echo %BLUE%=============================================================%NC%
echo %BLUE%    Romega Solutions - Docker Security Scan (Windows)%NC%
echo %BLUE%=============================================================%NC%
echo.

REM Check if Trivy is installed
where trivy >nul 2>nul
if %errorlevel% neq 0 (
    echo %YELLOW%Trivy is not installed.%NC%
    echo.
    echo %YELLOW%Please install Trivy using one of these methods:%NC%
    echo   1. Scoop: scoop install trivy
    echo   2. Chocolatey: choco install trivy
    echo   3. Download from: https://github.com/aquasecurity/trivy/releases
    echo.
    pause
    exit /b 1
)
echo %GREEN%Trivy is installed%NC%
echo.

REM Check if Docker image exists
docker image inspect %FULL_IMAGE% >nul 2>nul
if %errorlevel% neq 0 (
    echo %YELLOW%Image %FULL_IMAGE% not found. Building it first...%NC%
    docker-compose build
    echo.
)

echo %BLUE%Starting security scan of %FULL_IMAGE%...%NC%
echo.

REM Scan 1: Vulnerabilities in OS packages and application dependencies
echo %YELLOW%[1/4] Scanning for OS and library vulnerabilities...%NC%
trivy image --severity HIGH,CRITICAL --exit-code 0 --format table %FULL_IMAGE%
echo.

REM Scan 2: Misconfigurations (Dockerfile best practices)
echo %YELLOW%[2/4] Scanning for Dockerfile misconfigurations...%NC%
trivy config --severity HIGH,CRITICAL --exit-code 0 ./Dockerfile
echo.

REM Scan 3: Secret detection
echo %YELLOW%[3/4] Scanning for exposed secrets...%NC%
trivy filesystem --severity HIGH,CRITICAL --scanners secret --exit-code 1 .
echo.

REM Scan 4: Generate detailed JSON report
echo %YELLOW%[4/4] Generating detailed security report...%NC%
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
for /f "tokens=1-2 delims=/: " %%a in ('time /t') do (set mytime=%%a%%b)
set REPORT_FILE=security-report-%mydate%-%mytime%.json

trivy image --format json --output %REPORT_FILE% %FULL_IMAGE%

if exist %REPORT_FILE% (
    echo %GREEN%Success: Detailed report saved to: %REPORT_FILE%%NC%
) else (
    echo %RED%Error: Failed to generate report%NC%
)
echo.

REM Summary
echo %BLUE%=============================================================%NC%
echo %BLUE%    Security Scan Summary%NC%
echo %BLUE%=============================================================%NC%
echo %GREEN%[DONE] OS/Library vulnerability scan completed%NC%
echo %GREEN%[DONE] Dockerfile configuration scan completed%NC%
echo %GREEN%[DONE] Secret detection scan completed%NC%
echo %GREEN%[DONE] Detailed report generated%NC%
echo.
echo %YELLOW%Next steps:%NC%
echo   1. Review vulnerabilities in the output above
echo   2. Check the detailed report: %REPORT_FILE%
echo   3. Update dependencies if critical issues found
echo   4. Re-scan after fixes
echo.
echo %BLUE%Tip: Run 'trivy image --help' for more scanning options%NC%
echo.

pause
