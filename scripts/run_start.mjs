import shell from "shelljs";
import config from '../config';

shell.exec(`
    
    #FOR DEMO PURPOSES ONLY: Gets you around SELF_SIGNED_CERT_IN_CHAIN issue when calling HTTPS endpoints without a valid CERT
    export NODE_TLS_REJECT_UNAUTHORIZED=0
    
`);