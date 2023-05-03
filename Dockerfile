FROM node:16.20.0

WORKDIR /usr/src/app

RUN apt-get update

# Dont skip this step. It is for caching.
COPY package*.json ./

CMD ["npm", "install"]

CMD ["knex", "migrate:latest"]

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start"]