import vault from './vault/vault-stage.json';

export default {
    name: 'DEMO',
    environment: {
        minikube: false, //will need to install consul container in a pod on the k8s deployment. TODO:// install consul so we can replicate prod
        stage: true
    },
    AWS: {
        ecr: '460570964411.dkr.ecr.us-west-2.amazonaws.com'
    },
    docker: {
        docker_file_path: './Docker/docker_files/Dockerfile',
        image: {
            name: 'raven-microservices', //must be LOWERCASE
            version: 'demo.v05172019.a.stage' // <name of microservice>.v<date>.<version>.stage
        },
        volumes: {}, //no volumes for stage this is for local only
        save_to_machine: true //Should we save the docker image to our machine or to minikube
    },
    mongo: {
        discovery: "consul",
        data: "RavenData",
        sessions: "RavenSessions",
        sockets: "RavenSockets",
        auth: {
            type: "config-userpass",
            userpass: vault.mongo_auth_userpassword
        },
        url: "",
        urlArgs: "?replicaSet=raven-stage&w=majority&ssl=true",
        options: {
            native_parser:true,
            readPreference: "ReadPreference.PRIMARY_PREFERRED",
            poolSize:5
        }
    }
}