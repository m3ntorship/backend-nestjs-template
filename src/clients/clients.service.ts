import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosStatic } from 'axios';

@Injectable()
export class ClientsService {
  constructor(
    private configService: ConfigService,
    @Inject('axios') private axios: AxiosStatic,
  ) {}
  private clientsConfig = this.configService.get('clients');
  private clients = {
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
    // Example - get
    get: (authorization: string) => {
      return this.clients.postsClient.get('/posts', {
        // Should research later on how do this in interceptor
        headers: {
          authorization,
        },
      });
    },
  };
  uploadAPI = {
    // Example - post
    post: (authorization: string) => {
      return this.clients.uploadClient.post(
        '/files',
        {},
        {
          headers: {
            authorization,
          },
        },
      );
    },
  };
}
