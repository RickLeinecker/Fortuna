FROM node:12.2.0-alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm i --silent

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "deploy"]