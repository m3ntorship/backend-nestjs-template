import { Module } from '@nestjs/common';
import { ModuleexampleService } from './moduleExample.service';
import { ModuleExampleContoller } from './moduleExample.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ServiceRepository } from './entities/serviceRepository';

@Module({
  // imports: [TypeOrmModule.forFeature([ServiceRepository])],
  controllers: [ModuleExampleContoller],
  providers: [ModuleexampleService],
})
export class ModuleExampleModule {}
