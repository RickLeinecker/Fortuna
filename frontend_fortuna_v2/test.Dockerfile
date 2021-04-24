FROM node:12.2.0-alpine

WORKDIR /app

ENV CHOKIDAR_USEPOLLING="true"

COPY package.json .

RUN npm i --silent

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]