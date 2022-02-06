FROM node:alpine
WORKDIR /usr/src/app
COPY ./package-lock.json ./
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 5000
CMD ["node", "./index.js"]