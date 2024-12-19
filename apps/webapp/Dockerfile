FROM node:18-alpine

WORKDIR /app

COPY package.json

# Install dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js runs on (usually 3000)
EXPOSE 3000

# The command to start your Next.js app in production mode
CMD ["npm", "run", "start"]
