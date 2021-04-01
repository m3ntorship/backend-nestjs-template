import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import axios from 'axios';
import interceptors from './interceptors/interceptors';

@Module({
  imports: [],
  providers: [
    ClientsService,
    {
      provide: 'axios',
      useValue: axios,
    },
    {
      provide: 'interceptors',
      useValue: interceptors,
    },
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
