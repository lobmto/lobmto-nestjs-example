import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [],
    })
      .useMocker((token) => {
        if (token === HealthService) {
          return { getStatus: jest.fn().mockResolvedValue('UP') };
        }
      })
      .compile();

    controller = app.get<HealthController>(HealthController);
  });

  describe('getStatus()', () => {
    it('should return "UP"', async () => {
      const result = await controller.getStatus();
      expect(result).toStrictEqual({ status: 'UP' });
    });
  });
});
