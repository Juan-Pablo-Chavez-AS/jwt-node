# Use Node.js as base image
FROM node:alpine

# Set working directory in the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate

# Copy the initialization script

# Build TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
#ENTRYPOINT [ "./init.sh" ]
CMD [ "npm", "run", "start" ]
