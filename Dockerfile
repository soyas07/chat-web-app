# Use Node.js LTS version as the base image
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the production build with a lightweight web server
FROM nginx:alpine

# Copy the built app from the previous stage to the nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to allow external access
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
