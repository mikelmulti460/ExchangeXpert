import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/infraestructure/auth/services/auth.service';

describe('ExchangeController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let jwtToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = app.get<AuthService>(AuthService);
    // Mock validateUser
    authService.validateUser = jest.fn().mockResolvedValue({
      username: 'testuser',
      userId: '1',
    });

    const loginResponse = await authService.login({
      username: 'testuser',
      password: 'testpassword',
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'user',
      userId: 1,
    });
    jwtToken = loginResponse.access_token;
  });

  it('/exchange (POST)', () => {
    const exchangeData = {
      sourceCurrency: 'PEN',
      targetCurrency: 'USD',
      amount: 10,
    };

    return request(app.getHttpServer())
      .post('/exchange/')
      .set('Authorization', `Bearer ${jwtToken}`) // agregar el token JWT
      .send(exchangeData) // enviar los datos como JSON
      .expect(201)
      .expect((response) => {
        // realizar verificaciones adicionales sobre la respuesta
        expect(response.body).toBeDefined();
        expect(response.body.status).toEqual(201);
        expect(response.body.message).toEqual(
          'The exchange has been successfully created.',
        );
        expect(response.body.data).toBeDefined();
        expect(response.body.data.sourceCurrency).toEqual('PEN');
        expect(response.body.data.targetCurrency).toEqual('USD');
        expect(response.body.data.amount).toEqual('10.000000');
        expect(response.body.data.convertedAmount).toBeDefined();
        expect(response.body.data.rate).toBeDefined();
        expect(response.body.data.exchangeId).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
