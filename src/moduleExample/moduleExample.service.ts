import {
  CounterMetric,
  PromService,
  HistogramMetric,
} from '@digikare/nestjs-prom';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceService {
  private readonly _counter: CounterMetric;
  private readonly _histogram: HistogramMetric;
  constructor(private readonly promService: PromService) {
    this._counter = this.promService.getCounter({ name: 'my_counter' });
    this._histogram = this.promService.getHistogram({
      name: 'myy_histogram',
      labelNames: ['b1', 'b2'],
      buckets: [0.03, 0.1],
    });
  }

  create(CreateServiceDto) {
    return 'This service item was created';
  }

  findAll() {
    this._counter.inc();
    return `This action returns all service`;
  }
}
