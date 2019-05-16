/* eslint-disable import/no-unresolved */

import { IngestApi, BasicsApi } from 'api';


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
        })
        /**
         * @swagger
         * /post_example_send:
         *   post:
         *     description: Make a call to send data to a post endpoint
         *     responses:
         *       201:
         *         description: Returns ingest data
         *       500:
         *         something went wrong
         *
         */
        app.get('/post_example_send', async (req, res) => {
            try {
                const requestPost = await BasicsApi.post_example();
                res.setHeader('Content-Type', 'application/json');
                res.send(requestPost);
            } catch(exception){
                res.setHeader('Content-Type', 'application/json');
                res.send({error: exception});
            }
        }),
            /**
             * @swagger
             * /post_example_save:
             *   post:
             *     description: save data to database
             *     responses:
             *       201:
             *         description: Returns ingest data
             *       500:
             *         something went wrong
             *
             */
            app.post('/post_example_save', async (req, res) => {
                try {
                    console.log('---- req body', req.body)
                    const requestPut = await BasicsApi.post_example_save(req.body);
                    res.setHeader('Content-Type', 'application/json');
                    res.send(requestPut);
                } catch(exception){
                    res.setHeader('Content-Type', 'application/json');
                    res.send({error: exception});
                }
            })
        /**
         * @swagger
         * /put_example:
         *   put:
         *     description: save data to database
         *     responses:
         *       201:
         *         description: Returns ingest data
         *       500:
         *         something went wrong
         *
         */
        //todo:// allow swagger to add data in swagger doc
        app.put('/put_example/:name', async (req, res) => {
            try {
                const nameParam = req.param.name;
                const requestPut = await BasicsApi.put_example(nameParam, req.body);
                res.setHeader('Content-Type', 'application/json');
                res.send(requestPut);
            } catch(exception){
                res.setHeader('Content-Type', 'application/json');
                res.send({error: exception});
            }
        })


    }
}