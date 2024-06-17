# Use an official Node.js runtime as a parent image
FROM node:latest

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3005

# Command to run the application
CMD ["npm", "start"]
