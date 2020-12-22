FROM node:12.2.0-alpine

WORKDIR /app

ADD package*.json /app

RUN npm i --silent

ADD . /app

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "devserver"]