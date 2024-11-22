# Stage 1: Build the client
FROM node:22-alpine as client-build

WORKDIR /app/client

# Copy and install dependencies
COPY client/package*.json ./
RUN npm cache clean --force
RUN npm install

# Copy the client files and build
COPY client/ ./
RUN npm run build

# Stage 2: Build the server
FROM node:22-alpine as server-build

WORKDIR /app/server

# Copy and install dependencies
COPY server/package*.json ./
RUN npm install

# Copy the server files
COPY server/ ./
RUN npm run build

# Stage 3: Run the full application
FROM node:22-alpine

WORKDIR /app

# Copy the client and server build
COPY --from=server-build /app/server/dist ./server/dist
COPY --from=client-build /app/client/build ./client/build

# Install the server prod dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --only=production

# Set the environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose the port
EXPOSE ${PORT}

# Start the server
CMD ["node", "server/dist/main.js"]
