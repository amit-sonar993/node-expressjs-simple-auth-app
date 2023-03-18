const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/app/database/models');
const httpStatus = require('http-status');
const { faker } = require('@faker-js/faker');

describe('Auth routes', () => {
    describe('POST /auth/register', () => {
        let newUser;
        beforeEach(() => {
            newUser = {
                first_name: faker.name.firstName(),
                last_name: faker.name.firstName(),
                email: faker.internet.email().toLowerCase(),
                password: 'password1',
            };
        });

        test('should return 201 and successfully register user if request data is ok', async () => {
            const res = await request(app).post('/auth/register').send(newUser).expect(httpStatus.CREATED);

            expect(res.body.user).not.toHaveProperty('password');
            expect(res.body.user).toEqual({
                id: expect.anything(),
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                createdAt: expect.anything(),
                updatedAt: expect.anything()
            });

            const dbUser = await User.findByPk(res.body.user.id);
            expect(dbUser).toBeDefined();
            expect(dbUser.password).not.toBe(newUser.password);
            expect(dbUser).toMatchObject({ first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email, });
        });
    })

    describe('POST /auth/login', () => {
        let newUser;
        beforeEach(() => {
            newUser = {
                first_name: faker.name.firstName(),
                last_name: faker.name.firstName(),
                email: faker.internet.email().toLowerCase(),
                password: 'password1',
            };
        });
        
        test('should return 200 and login user if email and password match', async () => {
            let res = await request(app).post('/auth/register').send(newUser).expect(httpStatus.CREATED);
            let newRegisteredUser = res.body.user;
                
            res = await request(app).post('/auth/login').send({email: newRegisteredUser.email, password: newUser.password}).expect(httpStatus.OK);

            expect(res.body).toMatchObject({
                "success": true,
                "data": {
                    "user": {
                        "id": newRegisteredUser.id,
                        "first_name": newRegisteredUser.first_name,
                        "last_name": newRegisteredUser.last_name,
                        "email": newRegisteredUser.email,
                        "createdAt": expect.anything(),
                        "updatedAt": expect.anything()
                    },
                    "access_token": expect.anything(),
                    "expires_at": expect.anything(),
                    "token_type": "Bearer"
                }
            })
        })
    })
})