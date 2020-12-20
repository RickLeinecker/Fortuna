FROM node:12.2.0-alpine

WORKDIR /app/src/backend

COPY ./package*.json /app/

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "devserver"]