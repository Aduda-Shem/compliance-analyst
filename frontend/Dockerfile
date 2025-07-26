FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Install a simple static server
RUN npm install -g serve

# Use it to serve the static `out/` folder
EXPOSE 3000
CMD ["serve", "-s", "out", "-l", "3000"]
