FROM node:14

WORKDIR /usr/src/clean-node-api

COPY ./package.json ./

RUN yarn install --production

COPY ./dist ./dist

EXPOSE 5000

CMD yarn start