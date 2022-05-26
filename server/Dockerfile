FROM node:16.15.0-alpine AS BUILD_IMAGE

WORKDIR /usr/src/server
COPY ./server/package*.json ./
RUN npm install
COPY ./server ./
RUN npm run build

FROM node:16.15.0-slim

ENV NODE_ENV=production

COPY ./server/package*.json ./
RUN npm install
COPY ./server/pages ./pages
COPY ./server/static ./static
COPY --from=BUILD_IMAGE /usr/src/server/dist ./dist

CMD ["node", "dist/index.js"]