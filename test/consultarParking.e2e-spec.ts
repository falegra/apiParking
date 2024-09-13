import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BookingController (e2e)', () => {
    let app: INestApplication;
    let token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({username: 'fidel', password: '1231233'})
            .expect(222);

        token = loginResponse.body.token;
    });

    it('GET /booking', async () => {
        const response = await request(app.getHttpServer())
            .get('/booking')
            .set('Authorization', `Bearer ${token}`)
            .expect(236);

        const bookings = response.body.bookings;

        console.log({bookings});
        expect(bookings).toBeDefined();
    });

    afterAll(async () => {
        await app.close();
    });
});