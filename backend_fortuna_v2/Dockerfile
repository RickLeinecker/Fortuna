FROM node:12.2.0-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm i --silent

COPY . .

EXPOSE 5000

CMD ["npm", "run", "devserver"]