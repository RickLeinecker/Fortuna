FROM node:12.2.0-alpine

RUN mkdir -p /app
WORKDIR /app

ENV CHOKIDAR_USEPOLLING="true"

COPY ./package*.json /app/

RUN npm i --silent

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]