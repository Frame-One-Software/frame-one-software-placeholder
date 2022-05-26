FROM node:16.15.0-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/server
COPY ./server/package*.json ./
RUN npm install
COPY ./server ./
RUN npx tsc

CMD ["npm", "run", "start"]