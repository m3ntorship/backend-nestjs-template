FROM node:15.13.0-alpine3.10

RUN apk --no-cache add curl

WORKDIR /pickly-posts

COPY package.json package.json
COPY dist dist/
RUN mkdir -p stats

RUN yarn

# CMD ["node", "dist/src/main.js"]