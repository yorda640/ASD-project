# --- base image
FROM node:18-alpine

# --- workdir
WORKDIR /app

# --- copy package.json and install first (better caching)
COPY package*.json ./
RUN npm install --only=production

# --- copy the rest
COPY . .

# --- expose port
EXPOSE 8000

# --- run the server
CMD ["npm", "start"]
