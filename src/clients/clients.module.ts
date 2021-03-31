import { HttpModule, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Module({
  imports: [HttpModule],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
