import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModuleexampleService } from './moduleExample.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { CounterMetric, PromCounter } from '@digikare/nestjs-prom';
@Controller('service')
export class ModuleExampleContoller {
  constructor(private readonly moduleexampleService: ModuleexampleService) {}

  @Post()
  create(
    @Body() CreateServiceDto: CreateServiceDto,
    @PromCounter('tessssssssssst') counter: CounterMetric,
  ) {
    counter.inc();
    return this.moduleexampleService.create(CreateServiceDto);
  }

  @Get()
  findAll() {
    return this.moduleexampleService.findAll();
  }
}
