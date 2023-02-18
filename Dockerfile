FROM node:16-slim
WORKDIR /usr/app/src
COPY package*.json ./

RUN npm install --production

COPY src .

CMD ["node", "index.js"]