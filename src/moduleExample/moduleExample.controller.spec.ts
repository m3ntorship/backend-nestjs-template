import { PromModule } from '@digikare/nestjs-prom';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleExampleContoller } from './moduleExample.controller';
import { ModuleexampleService } from './moduleExample.service';

describe('ServiceController', () => {
  let controller: ModuleExampleContoller;
  let service: ModuleexampleService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PromModule.forRoot({
          withHttpMiddleware: {
            enable: true,
          },
        }),
      ],
      controllers: [ModuleExampleContoller],
      providers: [ModuleexampleService],
    }).compile();

    controller = moduleRef.get<ModuleExampleContoller>(ModuleExampleContoller);
    service = moduleRef.get<ModuleexampleService>(ModuleexampleService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = 'test';
      // const mock = jest.fn(() => result);

      jest.spyOn(controller, 'findAll').mockImplementation(() => result);

      expect(controller.findAll()).toBe(result);
      // expect(controller.findAll()).toHaveReturned();
    });
  });
});
