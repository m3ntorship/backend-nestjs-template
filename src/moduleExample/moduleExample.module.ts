import { Module } from '@nestjs/common';
import { ServiceService } from './moduleExample.service';
import { ServiceController } from './moduleExample.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ServiceRepository } from './entities/serviceRepository';

@Module({
  // imports: [TypeOrmModule.forFeature([ServiceRepository])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
