# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++

# Set environment variables for architecture
ENV npm_config_platform=linuxmusl
ENV npm_config_arch=x64

# Copy package files
COPY package*.json ./

# Install dependencies with forced architecture
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Stage 2: Production image remains Alpine
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]