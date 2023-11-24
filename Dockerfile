# Use Node.js as base image
FROM node:alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install -g prisma

# Install dependencies
RUN npm install
RUN npx prisma generate


# Copy the rest of the application code
COPY . .

# Copy the initialization script
#COPY init.sh .

# Give executable permission to the script
RUN chmod +x init.sh

# Build TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
#ENTRYPOINT [ "./init.sh" ]
CMD [ "npx", "prisma", "generate", "&&", "npm", "run", "start" ]
