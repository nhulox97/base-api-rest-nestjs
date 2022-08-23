import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get(AppService);
  });

  describe('AppService services', () => {
    it('should return hello world', () => {
      const result = service.getHello();

      expect(result).toEqual('Hello World!');
    });
  });
});
