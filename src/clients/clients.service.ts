import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class ClientsService {
  constructor(private clients, private httpService: HttpService) {
    this.clients = {};
  }
}
