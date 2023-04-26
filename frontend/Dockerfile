# Use the official Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use the Nginx image to serve the built application
FROM nginx:1.19-alpine

# Copy the built application from the Node.js image
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
