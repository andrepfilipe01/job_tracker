#!/bin/bash

# Set working directory to the script's location
cd "$(dirname "$0")"

echo "Setting up MongoDB container..."
docker run -d --name mongo-container -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  mongo:latest

# Check if MongoDB container started successfully
if [ $? -eq 0 ]; then
  echo "MongoDB container started successfully"
else
  echo "Failed to start MongoDB container. Container might already exist or port 27017 is in use."
  echo "Try: docker rm -f mongo-container (to remove existing container)"
fi

# Set up client
echo "Setting up client application..."
cd client
echo "Installing client dependencies..."
npm install

# Start client in background
echo "Starting client application..."
npm run dev &
CLIENT_PID=$!

# Return to base directory
cd ..

# Set up server
echo "Setting up server application..."
cd server
echo "Installing server dependencies..."
npm install

# Start server
echo "Starting server application..."
node server.js

# This section will execute if server.js exits
kill $CLIENT_PID
echo "Server stopped. Client process also terminated."
