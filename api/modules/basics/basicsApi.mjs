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
    post_example: (body) => {
        return new Promise(async (resolve, reject) => {
            try{
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
                    exception: exception.message
                })
            }
        })
    }
}