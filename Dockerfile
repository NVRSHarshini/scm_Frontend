# Use an official Node.js runtime as the base image
FROM node:14.16.0-alpine3.13
# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the build of your React app to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the app when the container is run
CMD ["npm", "start"]