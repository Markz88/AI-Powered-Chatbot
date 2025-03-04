# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app

# Install the dependencies specified in package.json
RUN npm install

# Copy the remaining application code to the working directory
COPY *.js /app
COPY public /app/public

# Make port 300 available to the world outside this container
EXPOSE 3000

# Specify the command to start the Node.js application
CMD ["node", "server.js"]