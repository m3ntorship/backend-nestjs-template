import { PromModule } from '@digikare/nestjs-prom';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from '../clients/clients.service';
import { ModuleexampleService } from './moduleExample.service';

describe('Moduleexample Service', () => {
  let service: ModuleexampleService;
  const clientsService = {
    postsAPI: {
      foo: jest.fn(() => Promise.resolve('test')),
    },
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PromModule.forRoot({
          withHttpMiddleware: {
            enable: true,
          },
        }),
      ],
      providers: [
        ModuleexampleService,
        {
          provide: ClientsService,
          useValue: clientsService,
        },
      ],
    }).compile();

    service = moduleRef.get<ModuleexampleService>(ModuleexampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have findAll & create functions', () => {
    expect(service).toHaveProperty('findAll');
    expect(service).toHaveProperty('create');
  });

  describe('findAll', () => {
    it('Should call the clientsService', async () => {
      const output = await service.findAll();
      expect(clientsService.postsAPI.foo).toHaveBeenCalled();
      expect(output).toBe('test');
    });
  });
});
