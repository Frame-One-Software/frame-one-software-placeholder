FROM node:16.6.2-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/server
COPY ./server/package*.json ./
RUN npm install --only={prod[uction]|dev[elopment]} #https://stackoverflow.com/questions/34700610/npm-install-wont-install-devdependencies
COPY ./server ./
RUN npm run build

CMD ["npm", "run", "start"]