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
 *  DbModifiedSuccess:
 *      properties:
 *          n:
 *              type: integer
 *              example: 1
 *          nModified:
 *              type: integer
 *              example: 1
 *          ok:
 *              type: integer
 *              example: 1
 *  details:
 *      properties:
 *          errorCode:
 *              type: string
 *              example: 'RMS<number>'
 *          reason:
 *              type: string
 *              example: 'Missing mandatory field'
 *          message:
 *              type: string
 *              example: 'Some meaningful error message'
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
 *  204:
 *      properties:
 *          status:
 *              type: integer
 *              example: 204
 *          details:
 *              $ref: '#/definitions/details'
 *  200Update:
 *      properties:
 *          code:
 *              type: integer
 *              example: 200
 *          message:
 *              type: string
 *              example: 'Document has been updated'
 *          result:
 *              $ref: '#/definitions/DbModifiedSuccess'
 *  400:
 *      properties:
 *          status:
 *              type: integer
 *              example: 400
 *          details:
 *              $ref: '#/definitions/details'
 *  404:
 *      properties:
 *          status:
 *              type: integer
 *              example: 404
 *          details:
 *              $ref: '#/definitions/details'
 *  500:
 *      properties:
 *          status:
 *              type: integer
 *              example: 500
 *          details:
 *              $ref: '#/definitions/details'
 *  504:
 *      properties:
 *          status:
 *              type: integer
 *              example: 504
 *          details:
 *              $ref: '#/definitions/details'
 */


export default {
    setup : function(app) {
        global.logger.info('Setting up routes')
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
         *       204:
         *          description: There is no content to send for this request
         *          schema:
         *              $ref: '#/definitions/204'
         *       404:
         *         description: Searching by primary key | not found
         *         schema:
         *              $ref: '#/definitions/404'
         *       504:
         *         description: Call outside of application or application itself has timedout
         *         schema:
         *            $ref: '#/definitions/504'
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
         *       404:
         *         description: Searching by primary key | not found
         *         schema:
         *              $ref: '#/definitions/404'
         *       500:
         *         description: Something went wrong
         *         schema:
         *           $ref: '#/definitions/500'
         *       504:
         *         description: Call outside of application or application itself has timedout
         *         schema:
         *            $ref: '#/definitions/504'
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
         *          200:
         *            description: Saves a new document to the database and returns the result and a message
         *            schema:
         *              $ref: '#/definitions/200'
         *          204:
         *            description: There is no content to send for this request
         *            schema:
         *              $ref: '#/definitions/204'
         *          400:
         *            description: Parameters provided are not correct
         *            schema:
         *              $ref: '#/definitions/400'
         *          404:
         *            description: Searching by primary key | not found
         *            schema:
         *              $ref: '#/definitions/404'
         *          500:
         *            description: Something went wrong
         *            schema:
         *              $ref: '#/definitions/details'
         *          504:
         *            description: Call outside of application or application itself has timedout
         *            schema:
         *              $ref: '#/definitions/504'
         *
         */
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
         *       description: Document was deleted
         *       schema:
         *         $ref: '#/definitions/200'
         *     204:
         *       description: There is no content to send for this request
         *       schema:
         *         $ref: '#/definitions/204'
         *     400:
         *       description: Parameters provided are not correct
         *       schema:
         *         $ref: '#/definitions/400'
         *     404:
         *       description: Searching by primary key | not found
         *       schema:
         *         $ref: '#/definitions/404'
         *     500:
         *       description: Something went wrong
         *       schema:
         *         $ref: '#/definitions/500'
         *     504:
         *         description: Call outside of application or application itself has timedout
         *         schema:
         *            $ref: '#/definitions/504'
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
        /**
         * @swagger
         * /patch_example/{id}:
         *   patch:
         *      parameters:
         *          - in: path
         *            name: id
         *            required: true
         *            schema:
         *              type: string
         *          - in: body
         *            name: Update
         *            schema:
         *              type: object
         *              example: {"newValue": "Hello world!"}
         *      description: Finds the document with the correct name and REPLACES only the items you specify or ADDS the items to the document if they do not exist
         *      responses:
         *          200:
         *            description: Updates an existing document in the database and returns the result and a message
         *            schema:
         *              $ref: '#/definitions/200Update'
         *          204:
         *            description: There is no content to send for this request
         *            schema:
         *              $ref: '#/definitions/204'
         *          400:
         *            description: Parameters provided are not correct
         *            schema:
         *              $ref: '#/definitions/400'
         *          404:
         *            description: Searching by primary key | not found
         *            schema:
         *              $ref: '#/definitions/404'
         *          500:
         *            description: Something went wrong
         *            schema:
         *              $ref: '#/definitions/500'
         *          504:
         *            description: Call outside of application or application itself has timedout
         *            schema:
         *               $ref: '#/definitions/504'
         *
         */
        app.patch('/patch_example/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const requestPatch = await BasicsApi.patch_example(id, req.body);
                res.setHeader('Content-Type', 'application/json');
                res.send(requestPatch);
            } catch(exception){
                res.setHeader('Content-Type', 'application/json');
                res.send({error: exception});
            }
        })
        /**
         * Must go at the end : Catch any routes that are not available
         *
         */
        app.get('*', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send({
                "code": 501,
                "details":[
                    {
                        "errorCode":"RMS0001",
                        "message": "This route is not found. Did you mistype? : API endpoint does not exist"
                    }
                ]
            });
        })


    }
}