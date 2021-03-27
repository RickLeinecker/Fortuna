FROM node:12.2.0-alpine

WORKDIR /usr/src/app

ENV CHOKIDAR_USEPOLLING="true"

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm i --silent

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]