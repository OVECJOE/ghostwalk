# Use Node.js base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy server files and install dependencies
COPY ./server ./server
WORKDIR /app/server
RUN npm install

# Copy client files, install dependencies, and build
WORKDIR /app
COPY ./client ./client
WORKDIR /app/client
RUN npm install & npm run build

# Set the working directory back to server
WORKDIR /app/server

# Expose the port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]