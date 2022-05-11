const request = require('supertest');
const server = 'http://localhost:3001';

describe('Route integration', () => {
    describe('/', () => {
        describe('GET', () => {
            it('responds with 201 status and text/html content type', () => request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(201))
        });
    });
});
