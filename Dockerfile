# Stage 1: Build the server
FROM node:22-alpine as server-build

WORKDIR /app/server

# Copy and install dependencies
COPY server/package*.json ./
RUN npm install

# Copy the server files
COPY server/ ./
RUN npm run build

# Stage 2: Run the full application
FROM node:22-alpine

WORKDIR /app

# Copy the client and server build
COPY --from=server-build /app/server/dist ./server/dist

# Install the server prod dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --only=production

# Set the environment variables
ENV NODE_ENV=production

# Expose the port
EXPOSE 8000

# Start the server
CMD ["node", "server/dist/main.js"]
