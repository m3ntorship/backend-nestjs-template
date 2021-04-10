import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ConfigService } from '@nestjs/config';

// @ts-expect-error: importing from manually mocked axios
// but ts compiler checks for mockAxiosInstance in actual axios module
import axios, { mockAxiosInstance } from 'axios';

const mockConfigService = {
  get: jest.fn().mockReturnValue({
    posts: { baseURL: 'posts' },
    notifications: { baseURL: 'notifications' },
    upload: { baseURL: 'upload' },
    media: { baseURL: 'media' },
  }),
};

const mockInterceptors = {
  addHeader: jest.fn(),
  changeData: jest.fn(),
};

describe('ClientsService', () => {
  let clientsService: ClientsService;

  beforeEach(async () => {
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

  // describe('Clients', () => {
  //   describe('Posts', () => {
  //     it('should be axios instance', () => {
  //       const client = clientsService['clients'].postsClient;
  //       expect(client).toEqual(mockAxiosInstance);
  //     });
  //   });
  //   describe('Media', () => {
  //     it('should be axios instance', () => {
  //       const client = clientsService['clients'].mediaClient;
  //       expect(client).toEqual(mockAxiosInstance);
  //     });
  //   });
  // });

  describe("API's", () => {
    describe('Posts', () => {
      describe('foo', () => {
        it('should return with axios (get) response', () => {
          const response = clientsService.postsAPI.foo();
          expect(response).toEqual('axios-get-promise');
        });
      });
    });
    describe('Media', () => {
      describe('foo', () => {
        it('should return with axios (get) response', () => {
          const response = clientsService.mediaAPI.foo();
          expect(response).toEqual('axios-get-promise');
        });
      });
    });
  });
});
