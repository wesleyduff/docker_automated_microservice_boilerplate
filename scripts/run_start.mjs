import shell from "shelljs";
import config from '../config';

shell.exec(`
    if npm test; then
      #FOR DEMO PURPOSES ONLY: Gets you around SELF_SIGNED_CERT_IN_CHAIN issue when calling HTTPS endpoints without a valid CERT
      export NODE_TLS_REJECT_UNAUTHORIZED=0
      echo "
-----------------------------
STARTING NODE SERVER : ALL TESTS PAST
-----------------------------
"
      node --inspect --experimental-modules app.mjs
    else 
      echo "
-----------------------------
STOPPING : fix tests then try again
-----------------------------
       "
    fi
`);