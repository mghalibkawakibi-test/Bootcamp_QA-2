FROM node:20

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm ci

USER root

RUN npx playwright install --with-deps
