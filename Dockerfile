FROM node:10

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn && yarn certs
COPY . /usr/src/app

CMD ["npm", "start"]