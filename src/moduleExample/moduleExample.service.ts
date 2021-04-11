import {
  CounterMetric,
  PromService,
  HistogramMetric,
} from '@digikare/nestjs-prom';
import { Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class ModuleexampleService {
  private readonly _counter: CounterMetric;
  private readonly _histogram: HistogramMetric;
  constructor(
    private readonly promService: PromService,
    private readonly clientsService: ClientsService,
  ) {
    this._counter = this.promService.getCounter({ name: 'my_counter' });
    this._histogram = this.promService.getHistogram({
      name: 'myy_histogram',
      labelNames: ['b1', 'b2'],
      buckets: [0.03, 0.1],
    });
  }

  create(CreateServiceDto) {
    return CreateServiceDto.firstName;
  }

  findAll() {
    this._counter.inc();
    return this.clientsService.postsAPI.foo();
  }
}
