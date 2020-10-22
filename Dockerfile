FROM node:alpine

LABEL github=https://github.com/Salomonrey/redis-cicd.git

COPY src /nodejs/src
COPY app.js nodejs/app.js
COPY package.json /nodejs/package.json
COPY bin /nodejs/bin
COPY tests /nodejs/tests

WORKDIR /nodejs

RUN npm install

EXPOSE 3000:3000