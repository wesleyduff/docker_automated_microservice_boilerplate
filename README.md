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

**AUTOMATION!** \
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
    

# QA Testers 
Run these commands to test docker container : Automation pending : TODO//

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