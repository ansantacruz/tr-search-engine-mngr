FROM node:16-slim
WORKDIR /usr/app/src
COPY package*.json ./

RUN npm install --force

COPY src .

EXPOSE 9036
ENV HOST 0.0.0.0

CMD npm start