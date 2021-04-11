import { Module } from '@nestjs/common';
import { ModuleexampleService } from './moduleExample.service';
import { ModuleExampleContoller } from './moduleExample.controller';
import { ClientsModule } from 'src/clients/clients.module';

// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ServiceRepository  } from './entities/serviceRepository';

@Module({
  imports: [
    ClientsModule,
    // TypeOrmModule.forFeature([ServiceRepository]),
  ],
  controllers: [ModuleExampleContoller],
  providers: [ModuleexampleService],
})
export class ModuleExampleModule {}
