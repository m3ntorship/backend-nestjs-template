import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModuleexampleService } from './moduleExample.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { CounterMetric, PromCounter } from '@digikare/nestjs-prom';
@Controller('service')
export class ModuleExampleContoller {
  constructor(private readonly moduleexampleService: ModuleexampleService) {}

  @Post()
  count(@PromCounter('tessssssssssst') counter: CounterMetric) {
    counter.inc();
  }
  @Post()
  create(@Body() CreateServiceDto: CreateServiceDto) {
    const newDTO = { ...CreateServiceDto, firstName: CreateServiceDto.name };
    return this.moduleexampleService.create(newDTO);
  }

  @Get()
  findAll() {
    return this.moduleexampleService.findAll();
  }
}
