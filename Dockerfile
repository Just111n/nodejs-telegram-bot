# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages
RUN npm install

# Make port available to the world outside this container
EXPOSE 8000


# Run bot when the container launches
CMD ["npm", "start"]
