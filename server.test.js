const request = require('supertest');
const serverRoot = require('./server');

describe('Server', () => {
  describe('[GET] / Endpoint', () => {
    it('should be running in "testing" environment', () => {
      expect(process.env.DB_ENV).toBe('testing');
    });

    it('should respond with status code of 200', () => {
      return request(serverRoot)
        .get('/')
        .expect(200);
    });

    it('should respond with "welcome" message', () => {
      return request(serverRoot)
        .get('/')
        .expect(/welcome/i);
    });
  });
});
