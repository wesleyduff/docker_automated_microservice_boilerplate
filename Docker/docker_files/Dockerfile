# escape=`


# specify the node base image with your desired version node:<version>
#https://nodejs.org/en/ ... 10.15.3 is the latest stable version as of 05/15/2019
FROM node:10.15.3

WORKDIR /data/apps/raven-web

# BUILD ARGS
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# port 3000 is the port our node server runs on. If you change this, change the port for the node server as well
EXPOSE 3000

# copy over all files in working dir EVEN the node_modules (most secure .. unsecure if we run npm i inside docker file because we need SSH keys to pull from stash)
COPY . .

# Launch the node server
CMD ["npm", "run", "docker-start"]