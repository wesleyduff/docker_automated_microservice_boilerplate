/* eslint-disable import/no-unresolved */

import { IngestApi, BasicsApi } from 'api';

/*
Defininitions (schemas) for object types
 */

/**
 * @swagger
 *
 * definitions:
 *  PostResultSuccess:
 *      properties:
 *          n:
 *              type: integer
 *              example: 1
 *          ok:
 *              type: integer
 *              example: 1
 *  User:
 *      properties:
 *          name:
 *              type: string
 *              example: 'John Doe'
 *          street1:
 *              type: string
 *              example: '1234 Red Bud'
 *          street2:
 *              type: string
 *              example: 'apt 2'
 *          city:
 *              type: string
 *              example: 'Shine bug'
 *          state:
 *              type: string
 *              example: 'Co'
 *          zip:
 *              type: integer
 *              example: 89988
 *  201:
 *      properties:
 *          code:
 *              type: integer
 *              example: 201
 *          message:
 *              type: string
 *              example: 'Document created and added to database'
 *          result:
 *              $ref: '#/definitions/PostResultSuccess'
 *  200:
 *      properties:
 *          code:
 *              type: integer
 *              example: 200
 *          message:
 *              type: string
 *              example: 'Request received from databse'
 *          result:
 *              type: object
 *  500:
 *      properties:
 *          code:
 *              type: integer
 *              example: 500
 *          message:
 *              type: string
 *              example: 'Server Error'
 */


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
         *         schema:
         *           $ref: '#/definitions/200'
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
         * /post_example:
         *   post:
         *     description: save data to database
         *     parameters:
         *          - in: body
         *            name: User
         *            schema:
         *              $ref: '#/definitions/User'
         *     responses:
         *       201:
         *         description: Saves a new document to the database and returns the result and a message
         *         schema:
         *           $ref: '#/definitions/201'
         *       500:
         *         description: Something went wrong
         *         schema:
         *           $ref: '#/definitions/500'
         *
         */
        app.post('/post_example', async (req, res) => {
            try {
                const requestPut = await BasicsApi.post_example(req.body);
                res.setHeader('Content-Type', 'application/json');
                res.send(requestPut);
            } catch(exception){
                res.setHeader('Content-Type', 'application/json');
                res.send({error: exception});
            }
        })
        /**
         * @swagger
         * /put_example/{name}:
         *   put:
         *      parameters:
         *          - in: path
         *            name: name
         *            required: true
         *            schema:
         *              type: string
         *          - in: body
         *            name: User
         *            schema:
         *              $ref: '#/definitions/User'
         *      description: Finds the document with the correct name and REPLACES the whole document with the body
         *      responses:
         *          201:
         *            description: Saves a new document to the database and returns the result and a message
         *            schema:
         *              $ref: '#/definitions/201'
         *          500:
         *            description: Something went wrong
         *            schema:
         *              $ref: '#/definitions/500'
         *
         */
        //todo:// allow swagger to add data in swagger doc
        app.put('/put_example/:name', async (req, res) => {
            try {
                const nameParam = req.params.name;
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