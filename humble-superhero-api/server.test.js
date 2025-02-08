// server.test.js
const request = require('supertest');
const app = require('./server');

describe('Superhero API', () => {
  beforeEach(() => {
    // Reset the in-memory database before each test
    app.locals.superheroes = [];
    app.locals.nextId = 1;
  });

  it('should add a new superhero', async () => {
    const response = await request(app)
      .post('/superheroes')
      .send({
        name: 'Batman',
        superpower: 'Intelligence',
        humilityScore: 9,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Batman');
  });

  it('should fetch superheroes sorted by humility score', async () => {
    // Add a superhero first
    await request(app)
      .post('/superheroes')
      .send({
        name: 'Superman',
        superpower: 'Flight',
        humilityScore: 8,
      });

    // Add another superhero
    await request(app)
      .post('/superheroes')
      .send({
        name: 'Batman',
        superpower: 'Intelligence',
        humilityScore: 9,
      });

    const response = await request(app).get('/superheroes');

    expect(response.status).toBe(200);
    expect(response.body[0].humilityScore).toBeGreaterThanOrEqual(response.body[1].humilityScore);
  });
});