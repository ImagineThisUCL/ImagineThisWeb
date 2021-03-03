# Reference: https://typeofnan.dev/how-to-serve-a-react-app-with-nginx-in-docker/

# Multi-stage: 1) Build React app, 2) nginx serves static assets

### BUILD phase
FROM node:10 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# Setup environment variables during build time, since CRA cannot read environment variable during runtime
ARG REACT_APP_DOMAIN
ARG REACT_APP_BACKEND_ADDRESS
ENV REACT_APP_BACKEND_ADDRESS=${REACT_APP_BACKEND_ADDRESS}
ENV REACT_APP_DOMAIN=${REACT_APP_DOMAIN}
# install node modules and build assets
RUN npm install && npm run build

### SERVE phase
FROM nginx:alpine
# Copy nginx config file
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy already built static assets
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]