import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosStatic } from 'axios';

@Injectable()
export class ClientsService {
  private readonly clientsConfig = this.configService.get('clients');

  private readonly clients = {
    postsClient: this.axios.create({
      baseURL: this.clientsConfig.posts.baseURL,
    }),

    mediaClient: this.axios.create({
      baseURL: this.clientsConfig.media.baseURL,
    }),
  };

  constructor(
    private readonly configService: ConfigService,
    @Inject('axios') private readonly axios: AxiosStatic,
    @Inject('interceptors') private readonly interceptors: any,
  ) {
    this.interceptors.addHeader(this.clients.postsClient);
    this.interceptors.changeData(this.clients.postsClient);
  }

  postsAPI = {
    foo: async () => {
      return this.clients.postsClient.get('/bar');
    },
  };

  mediaAPI = {
    foo: () => {
      this.interceptors.addHeader(this.clients.mediaClient);
      this.interceptors.changeData(this.clients.mediaClient);
      return this.clients.mediaClient.get('/bar');
    },
  };
}
