FROM node:12-alpine3.12

WORKDIR /app
COPY package*.json ./

RUN npm install --force
RUN npm run build
COPY node_modules /app/node_modules/
COPY build ./build/
COPY static ./static/
COPY tsconfig.json ./

CMD chmod 755  npm run deploy
