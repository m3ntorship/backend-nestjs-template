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
    private configService: ConfigService,
    @Inject('axios') private axios: AxiosStatic,
    @Inject('interceptors') private interceptors: any,
  ) {
    //global request interceptor
    this.axios.interceptors.request.use(
      (config) => {
        config.headers['x-foo-bar-global'] = 'xyz';
        return config;
      },
      (error) => {
        // just an example
        console.log(error);
        throw InternalServerErrorException;
      },
    );

    //global response interceptor
    this.axios.interceptors.response.use(
      (res) => {
        res.data = 'xyz-global';
        return res;
      },
      (error) => {
        // just an example
        console.log(error);
        throw InternalServerErrorException;
      },
    );
  }
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
    foo: () => {
      this.interceptors.addHeader(this.clients.postsClient);
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
