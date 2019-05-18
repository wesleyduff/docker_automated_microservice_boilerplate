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
                        code: 400,
                        message: 'Bad request : no body provided'
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
                    code: 400,
                    message: 'Parameters were not provided as exected. Wrong SYNTAX'
                })
            }
            try{
                const   replacement = data;

                //find by name
                const filter = {name: searchValue}

                const result = await global.DAO['mycollection'].replaceOne(filter, replacement, {upsert: true});

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
                    code: 400,
                    message: 'Bad request : id not provided'
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
                        code: 400,
                        message: 'Bad request : id not provided'
                    })
                } else if(id.constructor.name !== 'ObjetID' && typeof id === 'string'){
                    id = ObjectID(id);
                } else if(id.constructor.name !== 'ObjetID' && typeof id !== 'string') {
                    reject({
                        code: 400,
                        message: 'Bad request : ID provided is not of type ObjectID nor string'
                    })
                } else if(!data){
                    reject({
                        code: 400,
                        message: 'Bad request : New values not provided'
                    })
                } else if(Object.keys(data).length === 0){
                    reject({
                        code: 400,
                        message: 'Bad request : Data object was empty. Nothing to change'
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