FROM node:16-slim
WORKDIR /usr/app/src
COPY package*.json ./

RUN npm install --force

COPY src .

EXPOSE 9036
CMD ["node", "app.ts"]