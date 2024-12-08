# Use Node.js as base image for building
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN yarn

# Copy source code
COPY . .

# Build the app
RUN yarn build

# Use Node.js for serving
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install serve globally
RUN yarn global add serve

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start server
CMD ["serve", "-s", "dist", "-l", "3000"]
