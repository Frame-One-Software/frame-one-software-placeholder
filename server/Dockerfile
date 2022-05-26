FROM node:16.15.0-alpine AS BUILD_IMAGE

WORKDIR /usr/src/server
COPY ./server/package*.json ./
RUN npm install
COPY ./server ./
RUN npm run build
RUN npm prune --production

FROM node:16.15.0-alpine

ENV NODE_ENV=production

COPY --from=BUILD_IMAGE /usr/src/server/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/server/dist ./dist
COPY ./server/pages ./pages
COPY ./server/static ./static


CMD ["node", "dist/index.js"]