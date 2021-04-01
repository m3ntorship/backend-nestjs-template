import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import axios from 'axios';

@Module({
  imports: [],
  providers: [
    ClientsService,
    {
      provide: 'axios',
      useValue: axios,
    },
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
