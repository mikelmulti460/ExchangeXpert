FROM node:20.10-bullseye
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 3000
# CMD ["node", "server.js"]