FROM node:12-alpine3.12

WORKDIR /app
COPY package*.json ./

RUN npm install --production
COPY tsconfig.json ./
COPY . ./


CMD ["node", "./build/bin/www.js"]
