#base image
FROM node:13.1.0

#set working directory
WORKDIR /usr/src/weather/api

# add '/usr/src/sensei/node_modules.bin' to $PATH
ENV PATH /usr/src/weather/api/node_modules.bin:$PATH

# install and cache app dependencies
COPY package*.json /usr/src/
RUN npm install --silent

# Bundle app source
COPY . .

# start app
EXPOSE 3000
CMD [ "nodemon", "server.js" ]