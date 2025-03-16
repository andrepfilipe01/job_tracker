#!/bin/bash

# Set working directory to the script's location
cd "$(dirname "$0")"

# Start client in background
echo "Starting client application..."
cd client
npm run dev &
CLIENT_PID=$!

# Return to base directory
cd ..

# Start server
echo "Starting server application..."
cd server
node server.js

# This section will execute if server.js exits
kill $CLIENT_PID
echo "Server stopped. Client process also terminated."