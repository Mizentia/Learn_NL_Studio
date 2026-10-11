@echo off
title Learn NL Studio - Local Network Host
color 0a
cd /d "%~dp0"

echo ================================================================
echo         LEARN NL STUDIO - LOCAL NETWORK HOST (WIFI)
echo ================================================================
echo.

for /f "usebackq tokens=*" %%i in (`powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias '*Wi-Fi*', '*Ethernet*' -ErrorAction SilentlyContinue | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } | Select-Object -First 1).IPAddress"`) do set LOCAL_IP=%%i
if "%LOCAL_IP%"=="" set LOCAL_IP=localhost

echo Local IP: %LOCAL_IP%
echo Launching Learn Portal on Port 8084...
start http://%LOCAL_IP%:8084/

node server.js
pause
