@echo off
chcp 65001 >nul
echo ============================================
echo  Module Federation Demo - One-Click Start
echo ============================================

echo.
echo [1/3] Starting Remote A (Vue, port 9011)...
start "mf-remote-a" cmd /k "cd /d %~dp0remote-app-a && npm run dev"

echo [2/3] Starting Remote B (React, port 9012)...
start "mf-remote-b" cmd /k "cd /d %~dp0remote-app-b && npm run dev"

echo [3/3] Starting Host App (port 9010)...
start "mf-host" cmd /k "cd /d %~dp0host-app && npm run dev"

echo.
echo All apps started in separate windows!
echo.
echo Access URLs:
echo   - Host:     http://localhost:9010
echo   - Remote A: http://localhost:9011 (standalone)
echo   - Remote B: http://localhost:9012 (standalone)
echo.
echo Note: Run 'npm install' in each app directory first time
pause
