# base image
FROM node:13.1.0

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
RUN npm install --silent

# Bundle app source
COPY . .

# start app
EXPOSE 3000
CMD [ "node", "server.js" ]