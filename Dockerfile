FROM node:16

WORKDIR /usr/src/app

RUN npm install -g webpack nodemon

COPY . /usr/src/app/

RUN npm install

RUN npm run build

EXPOSE 3001

EXPOSE 8080

CMD [ "npm", "run", "start" ]