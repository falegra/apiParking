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
            .send({username: 'admin', password: '1231233'})
            .expect(222);

        token = loginResponse.body.token;
    });

    it('GET /booking', async () => {
        const name: string = 'Fidel updated';

        const response = await request(app.getHttpServer())
            .put('/user/1')
            .set('Authorization', `Bearer ${token}`)
            .send({name})
            .expect(239);
    });

    afterAll(async () => {
        await app.close();
    });
});