# pull official base image
FROM node:15.2.0-alpine

# set working directory
RUN mkdir -p /usr/src/app/frontend
WORKDIR /usr/src/app/frontend

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .
# RUN npm ci
RUN npm install --silent
# start app
CMD ["npm", "start"]