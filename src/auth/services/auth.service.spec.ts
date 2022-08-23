import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockTokenPayload } from '../mock/auth.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
        AuthService,
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe('Sign access token', () => {
    it('should return the signed token', () => {
      const result = service.generateAccessToken(mockTokenPayload.sub, mockTokenPayload.email);

      expect(result).toEqual('token');
    });
  });
});
