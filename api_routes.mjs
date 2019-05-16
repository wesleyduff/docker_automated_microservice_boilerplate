/* eslint-disable import/no-unresolved */

import { IngestApi } from 'api';


export default {
    setup : function(app) {
        /**
         * @swagger
         * /ingest:
         *   get:
         *     description: Start the ingest process
         *     responses:
         *       200:
         *         description: Returns ingest data
         */
        app.get('/ingest', async (req, res) => {
            try{
                const initIngest = await IngestApi.ingest();
                res.setHeader('Content-Type', 'application/json');
                res.send(initIngest);
            } catch(exception){
                res.setHeader('Content-Type', 'application/json');
                res.send({error: exception});
            }
        });


    }
}