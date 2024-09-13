import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Actions } from 'src/common/enum/actions.enum';

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

    it('POST /booking', async () => {
        const vehicleRegistration = "A000020";
        const vehicleType = 1;
        const startTime = "1726045200000";
        const endTime = "1726048800000";

        const body = {
            vehicleRegistration,
            vehicleType,
            startTime,
            endTime
        };

        const response = await request(app.getHttpServer())
            .post('/booking')
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(234);

        const booking = response.body.booking;

        expect(booking).toBeDefined();
        expect(booking.vehicleRegistration).toBe(vehicleRegistration);
        expect(booking.startDate).toBeDefined();
        expect(booking.startHour).toBeDefined();
        expect(booking.endDate).toBeDefined();
        expect(booking.endHour).toBeDefined();
        expect(booking.startTime).toBeDefined();
        expect(booking.endTime).toBeDefined();
        expect(booking.status).toBe(Actions.RESERVED)
        expect(booking.vehicleType).toBeDefined();
        expect(booking.place).toBeDefined();
        expect(booking.user).toBeDefined();
        expect(booking.id).toBeDefined();
    });

    afterAll(async () => {
        await app.close();
    });
});