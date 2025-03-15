#!/bin/bash

# Start the JSON server in the background
echo "Starting JSON server..."
npx json-server --watch src/data/db.json --port 5174  &
JSON_SERVER_PID=$!

# Wait a moment to ensure the server starts
sleep 2

# Start the React development server
echo "Starting React development server..."
npm run dev

# When the React server is stopped (Ctrl+C), also stop the JSON server
echo "Shutting down servers..."
kill $JSON_SERVER_PID
