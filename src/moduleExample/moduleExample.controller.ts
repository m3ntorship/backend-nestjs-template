import { Body, Controller, Get, Post } from '@nestjs/common';
import { ServiceService } from './moduleExample.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { CounterMetric, PromCounter } from '@digikare/nestjs-prom';
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(
    @Body() CreateServiceDto: CreateServiceDto,
    @PromCounter('tessssssssssst') counter: CounterMetric,
  ) {
    counter.inc();
    return this.serviceService.create(CreateServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }
}
