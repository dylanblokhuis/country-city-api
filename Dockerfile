FROM node:12

WORKDIR /usr/src/app

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]