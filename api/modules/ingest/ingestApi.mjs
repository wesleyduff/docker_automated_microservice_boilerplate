import fetch from 'node-fetch';

export default  {
    ingest: () => {
        return new Promise((resolve, reject) => {
            fetch('http://swapi.co/api/vehicles/30/')
                .then(res => {
                    return res.json();
                })
                .then( data => {
                    resolve({
                        status: 'started',
                        data,
                        message : 'Demo of working api call to mongo db'
                    })
                })
                .catch(exception => {
                    console.log('---- rejecting - reason', exception);
                    reject({
                        status: 'failure',
                        exception
                    })
                })
        })
    }
}