FROM node:latest

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY /app/package.json /usr/src/app
RUN npm install

COPY /app /usr/src/app

VOLUME /app:/usr/src/app

EXPOSE 4200

CMD ["npm", "start"]
