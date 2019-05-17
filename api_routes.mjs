/* eslint-disable import/no-unresolved */

import { IngestApi, BasicsApi } from 'api';

/*
Defininitions (schemas) for object types
 */

/**
 * @swagger
 *
 * definitions:
 *  DbChangeSuccess:
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
 *              $ref: '#/definitions/DbChangeSuccess'
 *  200:
 *      properties:
 *          code:
 *              type: integer
 *              example: 200
 *          message:
 *              type: string
 *              example: 'Request received from databse'
 *          result:
 *              $ref: '#/definitions/DbChangeSuccess'
 *  500:
 *      properties:
 *          code:
 *              type: integer
 *              example: 500
 *          message:
 *              type: string
 *              example: 'Server Error'
 *  400:
 *      properties:
 *          code:
 *              type: integer
 *              example: 400
 *          message:
 *              type: string
 *              example: 'Parameters were not provided as exected. Wrong SYNTAX'
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
         *       400:
         *         description: Parameters provided are not correct
         *         schema:
         *           $ref: '#/definitions/400'
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
         *          400:
         *            description: Parameters provided are not correct
         *            schema:
         *              $ref: '#/definitions/400'
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
        /**
         * @swagger
         * /delete_example/{id}:
         *  delete:
         *   parameters:
         *     - in: path
         *       name: id
         *       required: true
         *       schema:
         *         type: string
         *         example: '5cc1ec76bea30824ed9618e2'
         *   description: Delete a document by ID
         *   responses:
         *     200:
         *       description: Successfully deleted document from database
         *       schema:
         *         $ref: '#/definitions/200'
         *     400:
         *       description: Parameters provided are not correct
         *       schema:
         *         $ref: '#/definitions/400'
         *     500:
         *       description: Something went wrong
         *       schema:
         *         $ref: '#/definitions/500'
         *
         */
        app.delete('/delete_example/:id', async(req, res) => {
            try{
                const id = req.params.id;
                const requestDelete = await BasicsApi.delete_example(id);
                res.setHeader('Content-Type', 'application/json');
                res.send(requestDelete);
            }
            catch(exception){
                res.setHeader('Content-Type', 'application/json');
                res.send({error: exception});
            }
        })


    }
}