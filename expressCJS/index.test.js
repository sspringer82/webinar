jest.mock('mysql2/promise');

const jsonwebtoken = require('jsonwebtoken');
const request = require('supertest');
const app = require('./index.js');

describe('GET /users', () => {
  it('responds with a list of all users', (done) => {
    const token = jsonwebtoken.sign({ username: 'Test' }, 'topSecret');
    request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((error, response) => {
        expect(error).toBeNull();
        expect(response.body.length).toBe(2);
        expect(response.body[0].firstname).toBe('Jane');
        expect(response.body[1].lastname).toBe('Doe');
        done();
      });
  });
});
