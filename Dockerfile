FROM node:15.13.0-alpine3.10

RUN apk --no-cache add curl

WORKDIR /pickly-backend-template

COPY package.json package.json
COPY dist dist/

RUN yarn

CMD ["node", "dist/src/main.js"]
