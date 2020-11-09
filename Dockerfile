FROM node:12 as builder

WORKDIR /usr/src/app

RUN npm install

COPY . .

FROM node:12 

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

RUN npm install --production

RUN npm run build

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]