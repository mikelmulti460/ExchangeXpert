FROM node:20.10-bullseye
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

#TODO: edit this to run the production build

CMD ["yarn", "start"]
