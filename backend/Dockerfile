# pull official base image
FROM node:15.2.0-alpine

# set working directory
RUN mkdir -p /usr/src/app/backend
WORKDIR /usr/src/app/backend

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/backend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .
# RUN npm ci
RUN npm install --silent

# start app
CMD ["node", "./index.js"]