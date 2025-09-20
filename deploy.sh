#!/bin/bash

# -----------------------------
# Auto Deployment Script for swag-stitch.dhimansoft.com
# -----------------------------

# PROJECT_PATH="/var/www/vhosts/dhimansoft.com/swag-stitch.dhimansoft.com"
# BRANCH="main"
# LOG_FILE="$PROJECT_PATH/deploy.log"

# Load root-level .env if exists (for PROJECT_PATH, BRANCH, LOG_FILE etc.)
if [ -f ".env" ]; then
  set -a
  . ./.env
  set +a
fi

# Defaults if not set in .env
PROJECT_PATH=${PROJECT_PATH:-"/var/www/vhosts/dhimansoft.com/swag-stitch.dhimansoft.com"}
BRANCH=${BRANCH:-"main"}
LOG_FILE=${LOG_FILE:-"$PROJECT_PATH/deploy.log"}

echo "-----------------------------" >> $LOG_FILE
echo "Starting deployment: $(date)" >> $LOG_FILE


echo "-----------------------------" >> $LOG_FILE
echo "Starting deployment: $(date)" >> $LOG_FILE

# -----------------------------
# Backend Deployment
# -----------------------------
echo "Deploying Backend..." >> $LOG_FILE
cd $PROJECT_PATH/Backend || { echo "Backend folder not found!" >> $LOG_FILE; exit 1; }
git fetch origin $BRANCH
git reset --hard origin/$BRANCH
echo "Installing Backend dependencies..." >> $LOG_FILE
npm install >> $LOG_FILE 2>&1
echo "Restarting Backend server..." >> $LOG_FILE
pm2 restart swag-stitch-backend || pm2 start index.js --name swag-stitch-backend >> $LOG_FILE 2>&1
echo "Backend deployed." >> $LOG_FILE

# -----------------------------
# Frontend Deployment
# -----------------------------
echo "Deploying Frontend..." >> $LOG_FILE
cd $PROJECT_PATH/Frontend || { echo "Frontend folder not found!" >> $LOG_FILE; exit 1; }
git fetch origin $BRANCH
git reset --hard origin/$BRANCH
echo "Installing Frontend dependencies..." >> $LOG_FILE
npm install >> $LOG_FILE 2>&1
echo "Building Frontend..." >> $LOG_FILE
npm run build >> $LOG_FILE 2>&1
echo "Frontend build finished." >> $LOG_FILE

# -----------------------------
# Optional: Copy build to public folder
# -----------------------------
# Uncomment if your subdomain serves from a public folder
# echo "Copying build to public folder..." >> $LOG_FILE
# rm -rf $PROJECT_PATH/public/*
# cp -r $PROJECT_PATH/Frontend/dist/* $PROJECT_PATH/public/
# echo "Frontend copied to public folder." >> $LOG_FILE

echo "Deployment finished: $(date)" >> $LOG_FILE
echo "-----------------------------" >> $LOG_FILE