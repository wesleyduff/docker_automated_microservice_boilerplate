export default {
    name: 'DEMO',
    environment: {
        minikube: false,
        local: true
    },
    stash: {
        api_token: 'OTYzMjcyNTcxMTI5OsV+WK9DnO7JKvqmcM/V6uvNd0CB'
    },
    docker: {
        local_docker_file_path: './Docker/docker_files/Dockerfile_local',
        bindmount: true, //set to true if you want to edit files on local machine and see them change within the docker container
        image: {
            name: 'localexample', //must be LOWERCASE
            version: 'v1'
        },
        volumes: {
            path_source_on_container: '/data',
            path_source_on_host: '/' //$PWD is used as the root. Add any further drill down into rave-web as you like
        },
        save_to_machine: true //Should we save the docker image to our machine or to minikube
    },
    mongo: {
        discovery: "static",
        data: "RavenData",
        sessions: "RavenSessions",
        sockets: "RavenSockets",
        credentials: {
            type: "none",
            userpass: "",
            cert: ""
        },
        url: "mongodb://host.docker.internal:27017/",
        urlArgs: "?ssl=false",
        options: {
            native_parser:true,
            poolSize:5
        }
    }
}