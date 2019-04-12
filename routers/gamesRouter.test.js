const request = require('supertest');
const gamesRouter = require('../server');

describe('Games Router', () => {
  describe('[GET] /games Endpoint', () => {
    it('should respond with status code of 200', () => {
      return request(gamesRouter)
        .get('/games')
        .expect(200);
    });

    it('should respond with an array', () => {
      return request(gamesRouter)
        .get('/games')
        .expect(/\[.+\]/g);
    });

    it('should have Content-Type JSON header', () => {
      return request(gamesRouter)
        .get('/games')
        .expect('Content-Type', /application\/json/i);
    });
  });

  describe('[POST] /games Endpoint', () => {
    it('should refuse objects with incorrect fields', () => {
      return request(gamesRouter)
        .post('/games')
        .send({
          field: "incorrect",
          malicious_field: "not accepted"
        })
        .expect(422);
    });

    it('should accept object with required fields', () => {
      return request(gamesRouter)
        .post('/games')
        .send({
          title: 'Pacman',
          genre: 'Arcade'
        })
        .expect(200);
    });

    it('should respond with updated array on successful creation', () => {
      const newGame = { title: 'Pacman', genre: 'Arcade'};

      function responseContainsNewGame(res) {
        const bodyAsString = JSON.stringify(res.body);
        return bodyAsString.includes(newGame.title);
      }

      return request(gamesRouter)
        .post('/games')
        .send(newGame)
        .then(res => {
          expect(responseContainsNewGame(res)).toBe(true);
        });
    });
  });

  describe('[GET] /games/:id Endpoint', () => {
    it('should respond with status code of 200', () => {
      return request(gamesRouter)
        .get('/games/1')
        .expect(200);
    });

    it('should respond with an object on successful GET', () => {
      return request(gamesRouter)
        .get('/games/1')
        .expect(200)
        .expect(/\{.+\}/g);
    });

    it('should respond with 404 if id doesn\'t exist', () => {
      return request(gamesRouter)
        .get('/games/10000')
        .expect(404);
    });
  });
});
