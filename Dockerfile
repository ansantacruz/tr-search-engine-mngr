FROM node:16-slim
WORKDIR /usr/app/src
COPY package*.json ./

RUN npm install --force

COPY src .

CMD ["node", "app.js"]