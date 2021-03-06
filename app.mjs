import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import mongoDb from 'mongodb';
import routes from './api_routes';
import swaggerJSDoc from 'swagger-jsdoc';
import util from 'util';
import GetDAO from 'raven-dao';
import MongoConfig from 'raven-utils';
import config from './config';
import logger from './lib/logger'

const mongoConfig = MongoConfig.mongo
const app = express();
const port = 3000;

//initiate logger : set global logger
logger();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoConfig.init(config, function (err, tempDB, tempSettings) {
    if (err) {
        console.error('unable to establish mongo connection');

        // wait 1500ms prior to exiting to avoid pm2 categorizing this as a code error
        setTimeout(function () {
            console.log('-- exiting 1500ms after mongodb disconnect');
            process.exit(1);
        }, 1500);
    }

    const db = tempDB;

    global.logger.info('Mongo Connection: Connected!',{
        caller: "MongoConfig",
        message: "Setting up connection to mongodb"
    })

    return initApp(db);
})


function initApp(db) {
    /*
    Set DAO
    */
    global.DAO = GetDAO(db);

    // swagger definition
    var swaggerDefinition = {
        info: {
            title: 'Node Swagger API - Boilerplate',
            version: '1.0.0',
            description: 'RAVEN : 2.0 - DEMO ',
            host: 'localhost:3001'
        }
    };

// options for swagger jsdoc
    var options = {
        swaggerDefinition: swaggerDefinition, // swagger definition
        apis: ['./api_routes.mjs'] // path where API specification are written
    };

// initialize swaggerJSDoc
    var swaggerSpec = swaggerJSDoc(options);


    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    /* ---
    Set Routes
     */
    routes.setup(app);

// route for swagger.json
    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });


// START THE SERVER
// =============================================================================
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
