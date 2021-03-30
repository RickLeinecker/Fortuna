FROM node:12.2.0-alpine

WORKDIR /app

ADD package*.json /app/

RUN npm i --silent

ADD . /app/

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "devserver"]