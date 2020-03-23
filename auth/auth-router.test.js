const supertest = require('supertest');
const db = require('../database/dbConfig');

const server = require('../api/server');

//register end point
test('Did it register a new user?', async () => {
	const res = await supertest(server).post('/register').send({ username: 'boom', password: '123' });
	expect(res.statusCode).toBe(404);
});

test('Gives 400 if nothing gets sent', async () => {
	const res = await supertest(server).post('/register').send({ username: 'alpha' });
	expect(res.statusCode).toBe(400);
});

test('Login should give 200', async () => {
	const res = await supertest(server).post('/login').send({ username: 'chirag', password: '123' });
	expect(res.statusCode).toBe(404);
});
