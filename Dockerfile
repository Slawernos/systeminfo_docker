# Small official Node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install deps
RUN npm install --omit=dev

# Copy the rest
COPY . .

# The server listens on 3000
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
