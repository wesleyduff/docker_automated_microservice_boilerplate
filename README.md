# MICROSERVICES - 
**NOTE** in order to use this code you must have DOCKER & Node JS 8+ installed on your system

**NOTE** This automation is written for MAC. If you need this running for windows, please cut a ticket to add the additions

#What the Boilerplate Does
The boilerplate is a base for all your microservices that will run in a docker container. 
The container can be deployed by any container orchestration software.

Key features
- Everything is configurable in the config file \
 [ **start**, **local**, **stage** ]
- run locally via node server (no container)
- run locally via docker container 
  - run container without a bindmount (for QA testers and sanity checks by developers) 
  - run a container with a bindmount (for developers to make changes and see the changes in the container)
- Build container for deployment to kubernetes 
  - This will be different than the local container, because of how we connect to the mongo database
- Deploy to AWS ECR 
- Provide documentation to QA on how to run container
- Testing usinig JEST
- Code Coverage 
  - in terminal
  - available as website (HTML)

**AUTOMATION!** SCRIPTS \
**note** scripts will NOT run all the way through if there are failing tests \
what is Automated...
- `npm run local`
  - runs the automation process to build a local container on your system 
    - set name
    - set version
    - turn on or off bindmount
    - choose to run on minikube or not TODO:// Needs a new story to perform this task : issue - consul
    - when the script finishes
        - The docker container will be running
        - (MAC ONLY) your browser will open for you to the running docker container
        - The logs for the docker container will be logged out
        - Documentation for QA will run and you can copy the QA documentation and give to them when you give them the container to test
          - this is found under **Documentation_for_QA/share_with_qa.txt**
- `npm run clean-docker`
  - runs automation process to 
    - list out all running containers
    - stop the container
    - delete the container
    - delete the docker image (but not the cache)
      - to delete everything run `docker styem prune -a` then choose "y" for yes
- `npm run stage`
  - this is the command you run after UAT is approved the container. 
    - same code as before, but this container is deployable to our k8s cluster
  - at the end, you are presented with the next steps to deploy the container to AWS ECR
    - follow these steps
    - run the command that it tells you to at the end
      - `npm run stage-push`
- `npm run stage-push`
  - runs the command needed to push your docker container to AWS ECR
    - the location has been set for charterdev
    - we will need to setup the location for anything else than charterdev
  - you wil need
    - to setup your AWS CLI and have access to upload containers to AWS ECR
      - if you do not have this setup, you will need to create a few AWSPASS tickets
- `npm run prod`
  - this is TBD
  
**TESTING**

- `npm run test`
  - run tests for all tests
- `npm run test:coverage`
  - run tests for all and run coverage reporting
- `npm run open:coverage`
  - open the coverage reporting in your browser
- `npm run test:watch`
  - keep jest watching for test file changes
- `npm run security-check`
  - run nsp npm package manager checker. Security check.


# RUN COMMANDS
* = requires software to be installed - read installation section
- run locally in NODE SERVER - no container : `npm start`
- run locallin in a DOCKER CONTAINER * : `npm run local`
- package up for handoff to QA * : `npm run stage`

**Running local changes in docker container**
- set config to true for bindmount inside local config file : localed under docker
- run container
- make changes
- restart container
  - get container name, if you do not know it : `docker ps -a`
  - restart container : `docker restart <name>`

### INSTALL REQUIREMENTS
Docker must be installed on your system : [install docker (mac)](https://docs.docker.com/docker-for-mac/install/)

Node JS - you should already have this : [install node js](https://nodejs.org/en/download/)

Run code as in production with "minikube" : **NOTE** use virtual box setup: [install minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)

# DOCKER COMMANDS
- run : `docker run -p 3000:3000 --name <name> <docker image name>:<docker image ver>`
- ssh : `docker exec -it <name> /bin/bash`
- check running containters : `docker ps -a`
- stop running containers : `docker stop <name>`
- remove non running containers: `docker rm <name>`
- check docker images : `docker images`
- remove docker images : `docker rmi <image name>`

**GET LOGS** : `docker logs <name>`

## DANGER
- remove ALL docker images from docker environment
  - `docker system prune -a`
  
### INFO
Raven must control the creation of the docker file
- npm install must take place before the docker container is created
  - this is due to best practices and securieis
    - We cannot add ssh keys to docker images / they cannot be removed once added fully
    
    
# Get ready for release
- make sure tests are passing
- make sure you test container with different environment variables
  - start
  - local
  - stage
  - prod
- remove folders
  - api/basics : because this is an example.. 
    - make sure you remove the tests that go with the example or put an **x** before the test to make it skipped
      - __tests\__ /example/* 

# QA Testers 
Run these commands to test docker container : Automation pending : TODO//

Should have this info from **Documentation_for_QA/share_with_qa.txt

MORE DETAILS...

1. pull down docker image .tar file
2. cd into the folder where you saved your .tar file
3. run this command
- `docker load -i ./<name of file>.tar`
4. run this command to start container
- `docker run -p 3000:3000 --name <name> <docker image name>:<docker image ver>`

You should see a log message of started on port 3000. Or something similar

## cleanup after your done
1. Run these commands
- `docker stop <name>`
- `docker rm <name>`
- `docker rmi <docker image name>:<docker image ver>`

## double check your cleaned up
1. Run these commands
- should not see the running container any longer : `docker ps -a`
- should not see the container not running either : `docker ps`
- should not see the image any longer : `docker image ls` 


### Common HTTP Status Codes
Success

#### 200
- Only return a 2xx response if the operation was successful.

200 OK – Payload is expected \
201 Created – Use for POST responses \
202 No Content – Use instead of 200 OK if no payload is returned \
Client Error

#### 400 
- Do not return a 4xx error if you are not sure there is a problem with the request.

400 Bad Request – Service detects a client error \
400 Forbidden – Request is not authorized \ 
Bad Credentials \
Good Credentials with insufficient access privilege \
404 Not Found – Use it if a resource was searched with its ID. 403 can also be used in disclosure is deemed a security risk. \
405 Method Not Allowed – Example: POST to a read-only resource \
410 Gone – Permanent 404 \
Server Error \

#### 500
500 Internal Server Error – Do not use if caused by a bad request or the problem is upstream \
501 Not Implemented – Use this to let users know that the functionality is not supported (yet) \
502 Bad Gateway – Use instead of a 500 if the problem is an invalid upstream response \
503 Unavailable – Service (temporarily) cannot fulfill request. Could be caused by a loss of connection to a database or other service. \
504 Gateway Timeout – Use instead of a 500 if the problem is an invalid upstream timeout \

#TODO
1. VAULT
2. PROD
3. DEPLOY to minikube
- need consul container deployed as well to mirror prod
4. Testing example