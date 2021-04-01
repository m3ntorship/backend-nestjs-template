import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosStatic } from 'axios';

@Injectable()
export class ClientsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('axios') private readonly axios: AxiosStatic,
    @Inject('interceptors') private readonly interceptors: any,
  ) {}
  private readonly clientsConfig = this.configService.get('clients');

  private readonly clients = {
    postsClient: this.axios.create({
      baseURL: this.clientsConfig.posts.baseURL,
    }),

    notificationsClient: this.axios.create({
      baseURL: this.clientsConfig.notifications.baseURL,
    }),

    uploadClient: this.axios.create({
      baseURL: this.clientsConfig.upload.baseURL,
    }),

    mediaClient: this.axios.create({
      baseURL: this.clientsConfig.media.baseURL,
    }),
  };

  postsAPI = {
    foo: async () => {
      this.interceptors.addHeader(this.clients.postsClient);
      // this.interceptors.changeData(this.clients.postsClient);
      return this.clients.postsClient.get('/bar');
    },
  };

  uploadAPI = {
    foo: () => {
      this.interceptors.addHeader(this.clients.uploadClient);
      return this.clients.uploadClient.post('/bar', { foo: 'bar' });
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
