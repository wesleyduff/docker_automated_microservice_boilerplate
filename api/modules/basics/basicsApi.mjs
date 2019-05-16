import fetch from 'node-fetch';

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
                        exception: exception.message
                    })
                })
        })
    },
    post_example: (data = {name: 'John Doe'}) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/put_example_save',
                {
                    method: 'put',
                    body: JSON.stringify(data),
                    headers: {'Content-Type' : 'application/json'}
                })
                .then(res => {
                    return res.json();
                })
                .then( data => {
                    resolve({
                        code: 201,
                        data
                    })
                })
                .catch(exception => {
                    console.log('---- rejecting - reason', exception);
                    reject({
                        code: 500,
                        exception: exception.message
                    })
                })
        })
    },
    post_example_save: (body) => {
        return new Promise(async (resolve, reject) => {
            try{
                const result = await global.DAO['mycollection'].insert(body);
                resolve({
                    code: 201,
                    result
                })
            } catch(exception) {
                reject({
                    code: 500,
                    exception: exception.message
                })
            }
        })
    },
    put_example: (filter, data) => {
        return new Promise(async (resolve, reject) => {
            try{
                const   replacement = data;

                const result = await global.DAO['mycollection'].replaceOne(filter, replacement, {upsert: true});

                resolve({
                    code: 201,
                    result
                })
            } catch(exception) {
                reject({
                    code: 500,
                    exception: exception.message
                })
            }
        })
    }
}