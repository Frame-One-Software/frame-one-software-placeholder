FROM node:16.15.0-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/server
COPY ./server ./
RUN npm install && \
    npm run build && \
    npm uninstall typescript --no-save

CMD ["npm", "run", "start"]