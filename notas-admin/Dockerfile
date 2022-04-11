FROM node:16.14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm i

COPY . .
RUN npm run-script build

EXPOSE 8000
ENTRYPOINT ["npm", "run-script", "start"]