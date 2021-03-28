FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install && mkdir -m777 node_modules/.cache
COPY . .

RUN npm run build

USER node
CMD node "build/index.js"
