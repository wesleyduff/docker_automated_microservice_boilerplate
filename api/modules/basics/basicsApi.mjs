import fetch from 'node-fetch';
import mongodb from 'mongodb';
const ObjectID = mongodb.ObjectID;

export default  {
    get_example: () => {
        return new Promise((resolve, reject) => {
            fetch('http://swapi.co/api/vehicles/30/')
                .then(res => {
                    return res.json();
                })
                .then( data => {
                    resolve({
                        code: 200,
                        data
                    })
                })
                .catch(exception => {
                    console.log('---- rejecting - reason', exception);
                    reject({
                        code: 502,
                        message: exception.message
                    })
                })
        })
    },
    post_example: (body) => {
        return new Promise(async (resolve, reject) => {
            try{
                if(!body){
                    reject({
                        status: 400,
                        details: {
                            errorCode: 'RMS3001',
                            reason: 'No body was found',
                            message: 'Please provide the correct amount of arguments to the method.'
                        }
                    })
                }
                const result = await global.DAO['mycollection'].insert(body);
                resolve({
                    code: 201,
                    message: 'Document has been added',
                    result
                })
            } catch(exception) {
                reject({
                    code: 500,
                    message: exception.message
                })
            }
        })
    },
    put_example: (searchValue, data) => {
        return new Promise(async (resolve, reject) => {
            if(!searchValue || !data){
                reject({
                    status: 400,
                    details: {
                        errorCode: 'RMS2001',
                        reason: 'One or more arguments were not provided',
                        message: 'Please provide the correct amount of arguments to the method.'
                    }
                })
            }
            try{
                const   replacement = data;

                //find by name
                const filter = {name: searchValue}

                const result = await global.DAO['mycollection'].replaceOne(filter, replacement, {upsert: true});

                if(result.ok && !result.n){
                    //query performed but nothing was updated
                    reject({
                        status: 404,
                        details : {
                            errorCode: 'RMS2002',
                            reason: 'The search value did not yeild any results to update',
                            message: 'Please try a different search value. The search value provided did not yeild any results.'
                        },
                        result
                    })
                }

                resolve({
                    code: 200,
                    message: 'Document has been replaced',
                    result
                })
            } catch(exception) {
                reject({
                    code: 500,
                    message: exception.message
                })
            }
        })
    },
    delete_example: (id)=> {
        return new Promise(async (resolve, reject) => {
            if(!id){

                reject({
                    status: 400,
                    details: {
                        errorCode: 'RMS4001',
                        reason: 'Id was found',
                        message: 'Please provide the correct amount of arguments to the method.'
                    }
                })
            }
            try{
                const result = await global.DAO['mycollection'].deleteById(id);

                resolve({
                    code: 200,
                    message: 'Document was deleted',
                    result
                })
            } catch(exception) {
                reject({
                    code: 500,
                    message: exception.message
                })
            }
        })
    },
    patch_example: (id, data = {}) => {
        return new Promise(async (resolve, reject) => {
            try{
                if(!id){
                    reject({
                        status: 400,
                        details: {
                            errorCode: 'RMS2001',
                            reason: 'The ID argument was not provided',
                            message: 'Please provide an ID as an argument : string || ObjectID'
                        }
                    })
                } else if(id.constructor.name !== 'ObjetID' && typeof id === 'string'){
                    id = ObjectID(id);
                } else if(id.constructor.name !== 'ObjetID' && typeof id !== 'string') {
                    reject({
                        status: 400,
                        details: {
                            errorCode: 'RMS2002',
                            reason: 'The ID argument was not of type STRING or OBJECTID',
                            message: 'Bad request : ID provided is not of type ObjectID nor string'
                        }
                    })
                }
                if(!data){
                    reject({
                        status: 400,
                        details: {
                            errorCode: 'RMS2003',
                            reason: 'The data argument was not provided',
                            message: 'Please provide a data object as an argument'
                        }
                    })
                } else if(Object.keys(data).length === 0){
                    reject({
                        status: 400,
                        details: {
                            errorCode: 'RMS2004',
                            reason: 'The data argument was provided but was an empty object',
                            message: 'Please provide a data object as an argument with one or more key value pairs'
                        }

                    })
                }
                const   replacement = data,
                        querySelector = {_id: id},
                        newValues = {$set : data};

                const result = await global.DAO['mycollection'].update(querySelector, newValues);

                resolve({
                    code: 200,
                    message: 'Document has been updated',
                    result
                })
            } catch(exception) {
                reject({
                    code: 500,
                    message: exception.message
                })
            }
        })
    },
}