import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceService {
  findAll() {
    return `This action returns all service`;
  }
}
