import { HttpModule, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import axios from 'axios';

@Module({
  imports: [HttpModule],
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
