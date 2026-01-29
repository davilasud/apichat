#!/bin/bash

# --- CONFIGURACIÓN ---
BACKEND_PATH="/home/deploy/davilasud/backend"
FRONTEND_PATH="/home/deploy/davilasud/frontend"
FRONTEND_PORT=4101

echo "🚀 Iniciando despliegue automatizado..."

# 1. Actualizar Backend
echo "📦 Actualizando Backend..."
cd $BACKEND_PATH
git pull
npm install
npm run build
pm2 restart davilasud-backend --update-env

# 2. Actualizar Frontend
echo "📦 Actualizando Frontend..."
cd $FRONTEND_PATH
git pull
npm install
# Si tu front también requiere build, descomenta la siguiente línea:
npm run build 

# Limpiar puerto antes de reiniciar para evitar EADDRINUSE
echo "🧹 Limpiando puerto $FRONTEND_PORT..."
sudo fuser -k $FRONTEND_PORT/tcp || true

pm2 restart davilasud-frontend --update-env

echo "✅ ¡Todo listo! Los cambios ya deberían estar en vivo."
pm2 status