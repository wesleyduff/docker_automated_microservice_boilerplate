export default {
    name: 'DEMO',
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
        url: "mongodb://127.0.0.1:27017/",
        urlArgs: "?ssl=false",
        options: {
            native_parser:true,
            poolSize:5
        }
    }
}