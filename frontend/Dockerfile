FROM node:alpine
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
ARG HOST_WS
ENV HOST_WS=$HOST_WS
EXPOSE 3000
CMD ["npm", "start"]