import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

jest.mock('axios');

const mockInterceptors = {
  addHeader: jest.fn(),
  changeData: jest.fn(),
};

describe('ClientsService', () => {
  let clientsService: ClientsService;

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue({
        posts: { baseURL: 'posts' },
        notifications: { baseURL: 'notifications' },
        upload: { baseURL: 'upload' },
        media: { baseURL: 'media' },
      }),
    };
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn(),
    });
    const testClientsModule: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ClientsService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: 'axios',
          useValue: axios,
        },
        {
          provide: 'interceptors',
          useValue: mockInterceptors,
        },
      ],
    }).compile();

    clientsService = testClientsModule.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(clientsService).toBeDefined();
  });

  describe("API's", () => {
    describe('Posts', () => {
      describe('foo', () => {
        it('should return with axios (get) response', async () => {
          (clientsService['clients'].postsClient
            .get as jest.Mock).mockResolvedValue('axios-get-promise-reslove');
          const response = await clientsService.postsAPI.foo();
          expect(response).toEqual('axios-get-promise-reslove');
        });
      });
    });
    describe('Media', () => {
      describe('foo', () => {
        it('should return with axios (get) response', async () => {
          (clientsService['clients'].postsClient
            .get as jest.Mock).mockResolvedValue('axios-get-promise-reslove');
          const response = await clientsService.mediaAPI.foo();
          expect(response).toEqual('axios-get-promise-reslove');
        });
      });
    });
  });
});
