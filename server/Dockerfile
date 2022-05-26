FROM node:16.15.0 AS BUILD_IMAGE

# Install Docker Prune
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/server
COPY ./server/package*.json ./
RUN npm install
COPY ./server ./
RUN npm run build

# Remove the dev dependencies
 RUN npm prune --production

# Run Docker Prune
RUN /usr/local/bin/node-prune


FROM node:16.15.0-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/server
COPY ./server/package.json ./
COPY ./server/tsconfig.json ./
COPY --from=BUILD_IMAGE /usr/src/server/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/server/dist ./dist
COPY ./server/pages ./pages
COPY ./server/static ./static

CMD ["node", "dist/index.js"]