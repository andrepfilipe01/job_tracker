#!/bin/bash

# Set working directory to the script's location
cd "$(dirname "$0")"

echo "Checking if MongoDB container exists..."
if [ "$(docker ps -a | grep mongo-container)" ]; then
  echo "MongoDB container already exists"
else
  echo "Creating new MongoDB container..."
  docker run -d --name mongo-container -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    mongo:latest
fi

# Set up client
echo "Setting up client application..."
cd client
echo "Installing client dependencies..."
npm install

# Return to base directory
cd ..

# Set up server
echo "Setting up server application..."
cd server
echo "Installing server dependencies..."
npm install

echo "Setup complete! Run start.sh to launch the applications."