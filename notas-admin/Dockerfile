FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm i

COPY . .
RUN npm run-script build

ENTRYPOINT ["npm", "run-script", "start"]