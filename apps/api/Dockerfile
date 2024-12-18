FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the source code
COPY . .

# Expose the application port
EXPOSE ${PORT}

# Start the application
CMD ["npm", "run", "start"]
