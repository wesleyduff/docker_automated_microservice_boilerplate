const { BasicsApi } = require('api')

describe('Testing our REST examples : ', () => {

    beforeAll(() => {
        global.DAO = {};
        global.DAO.mycollection = {
            insert: jest.fn(),
            replaceOne: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn()
        }
    });

    describe('GET EXAMPLE : ', () => {

        beforeAll(() => {
            BasicsApi.get_example = jest.fn();
        });

        it('Should get a failure response', () => {
            expect.assertions(1);
            const response = {
                "code": 502,
                "exception": 'Fake exception'
            }
            BasicsApi.get_example.mockImplementationOnce(() => Promise.reject(response))

            return BasicsApi.get_example()
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a successful response ', async () => {
            expect.assertions(1);
            const response = {
                "code": 200,
                "message": "Request received from databse",
                "result": {
                    "n": 1,
                    "ok": 1
                }
            };
            BasicsApi.get_example.mockResolvedValue(response);
            const getResult = await BasicsApi.get_example();
            expect(getResult).toEqual(response);
        });



    });

    describe('POST EXAMPLE : ', () => {


        it('Should get a failure response from not having a parameter of body', () => {
            expect.assertions(1);
            const response = {
                code: 400,
                message: 'Bad request : no body provided'
            }

            return BasicsApi.post_example()
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a failure response', () => {
            expect.assertions(1);
            const response = {
                "code": 500,
                "message": "Mock implementation failure"
            }
            global.DAO.mycollection.insert.mockImplementationOnce(() => { throw new Error('Mock implementation failure')});
            return BasicsApi.post_example({key:'value'})
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a success response', () => {
            expect.assertions(1);
            const response = {
                "code": 201,
                "message": "Document has been added",
                "result": {
                    "n": 1,
                    "ok": 1
                }
            }
            global.DAO.mycollection.insert.mockImplementationOnce(() => Promise.resolve({
                n:1,
                ok:1
            }))

            return BasicsApi.post_example({key:'value'})
                .then(data => {
                    expect(data).toEqual(response);
                })
        })

    });

    describe('PUT EXAMPLE : ', () => {


        it('Should get a failure response from not having a parameter of searchValue', () => {
            expect.assertions(1);
            const response = {
                code: 400,
                message: 'Parameters were not provided as exected. Wrong SYNTAX'
            }

            return BasicsApi.put_example()
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a failure response from not having a parameter of data', () => {
            expect.assertions(1);
            const response = {
                code: 400,
                message: 'Parameters were not provided as exected. Wrong SYNTAX'
            }

            return BasicsApi.put_example('serachValue')
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a failure response', () => {
            expect.assertions(1);
            const response = {
                "code": 500,
                "message": "Mock implementation failure"
            }
            global.DAO.mycollection.replaceOne.mockImplementationOnce(() => { throw new Error('Mock implementation failure')});
            return BasicsApi.put_example('searchValue', {data:'value'})
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a success response', () => {
            expect.assertions(1);
            const response = {
                "code": 200,
                "message": "Document has been replaced",
                "result": {
                    "n": 1,
                    "ok": 1
                }
            }
            global.DAO.mycollection.replaceOne.mockImplementationOnce(() => Promise.resolve({
                n:1,
                ok:1
            }))

            return BasicsApi.put_example('searchValue', {data:'value'})
                .then(data => {
                    expect(data).toEqual(response);
                })
        })

    });

    describe('PATCH EXAMPLE : ', () => {


        it('Should get a failure response from not having a parameter of id', () => {
            expect.assertions(1);
            const response = {
                code: 400,
                message: 'Bad request : id not provided'
            }

            return BasicsApi.patch_example()
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a failure response from not having an id of type ObjectID or string', () => {
            expect.assertions(1);
            const response = {
                code: 400,
                message: 'Bad request : ID provided is not of type ObjectID nor string'
            }

            return BasicsApi.patch_example([1])
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a failure response because the objectID conversion must accept the correct pattern', () => {
            expect.assertions(1);
            const response = {
                code: 500,
                message: 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
            }

            return BasicsApi.patch_example('1234' )
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        xit('Should get a failure response when data is an empty object', () => {
            expect.assertions(1);
            const response = {
                code: 400,
                message: 'Bad request : Data object was empty. Nothing to change'
            }

            return BasicsApi.patch_example('5cc1ec76bea30824ed9618e2', {})
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a failure response', () => {
            expect.assertions(1);
            const response = {
                "code": 500,
                "message": "Mock implementation failure"
            }
            global.DAO.mycollection.update.mockImplementationOnce(() => { throw new Error('Mock implementation failure')});
            return BasicsApi.patch_example('5cc1ec76bea30824ed9618e2', {key: 'value'})
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a success response', () => {
            expect.assertions(1);
            const response = {
                "code": 200,
                "message": "Document has been updated",
                "result": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
            global.DAO.mycollection.update.mockImplementationOnce(() => Promise.resolve({
                "n": 1,
                "nModified": 1,
                "ok": 1
            }))

            return BasicsApi.patch_example('5cc1ec76bea30824ed9618e2', {key: 'value'})
                .then(data => {
                    expect(data).toEqual(response);
                })
        })

    });

    describe('DELETE EXAMPLE : ', () => {


        it('Should get a failure response from not having a parameter of searchValue', () => {
            expect.assertions(1);
            const response = {
                code: 400,
                message: 'Bad request : id not provided'
            }

            return BasicsApi.delete_example()
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a failure response', () => {
            expect.assertions(1);
            const response = {
                "code": 500,
                "message": "Mock implementation failure"
            }
            global.DAO.mycollection.deleteById.mockImplementationOnce(() => { throw new Error('Mock implementation failure')});
            return BasicsApi.delete_example('searchValue', {data:'value'})
                .catch(error => {
                    expect(error).toEqual(response);
                })
        })

        it('Should get a success response', () => {
            expect.assertions(1);
            const response = {
                "code": 200,
                "message": "Document was deleted",
                "result": {
                    "n": 1,
                    "ok": 1
                }
            }
            global.DAO.mycollection.deleteById.mockImplementationOnce(() => Promise.resolve({
                n:1,
                ok:1
            }))

            return BasicsApi.delete_example('searchValue', {data:'value'})
                .then(data => {
                    expect(data).toEqual(response);
                })
        })

    });

})