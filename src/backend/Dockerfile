FROM node:10.19.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src/backend .
EXPOSE 3001
CMD ["npm","start"]