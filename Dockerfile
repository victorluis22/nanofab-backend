FROM node:18

WORKDIR /nanofabBackend

COPY "package*.json" ./

RUN yarn

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD ["yarn", "start"]