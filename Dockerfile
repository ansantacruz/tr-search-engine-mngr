FROM node:12-alpine3.12
RUN npm install --force

WORKDIR /app
COPY package*.json ./
COPY node_modules /app/node_modules/
COPY build ./build/
COPY static ./static/
COPY tsconfig.json ./

CMD chmod 755  npm run deploy
