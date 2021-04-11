import { Test, TestingModule } from '@nestjs/testing';
import { ModuleExampleContoller } from './moduleExample.controller';
import { ModuleexampleService } from './moduleExample.service';

describe('ModuleExampleController', () => {
  let controller: ModuleExampleContoller;
  const service = {
    findAll: jest.fn(() => 'test'),
    create: jest.fn(() => 'Sahl'),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ModuleExampleContoller],
      providers: [ModuleexampleService],
    })
      .overrideProvider(ModuleexampleService)
      .useValue(service)
      .compile();

    controller = moduleRef.get<ModuleExampleContoller>(ModuleExampleContoller);
  });

  it('should have create & findAll methods', () => {
    expect(controller).toHaveProperty('findAll');
    expect(controller).toHaveProperty('create');
  });
  describe('findAll', () => {
    it('should return the mocked service output', () => {
      expect(controller.findAll()).toBe('test');
    });
  });

  describe('create', () => {
    it('should return a string created', () => {
      const dto = { name: 'Sahl' };
      const modifiedDto = { ...dto, firstName: 'Sahl' };
      expect(controller.create(dto)).toBe('Sahl');
      expect(service.create).toBeCalledWith(modifiedDto);
    });
  });
});
