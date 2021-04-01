import { HttpService, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ClientsService {
  constructor(private httpService: HttpService) {}
  clients = {
    postsClient: axios.create({
      baseURL: '', // config
    }),
    notificationsClient: axios.create({
      baseURL: '', // config
    }),
    uploadClient: axios.create({
      baseURL: '', // config
    }),
    mediaClient: axios.create({
      baseURL: '', // config
    }),
  };
  postsAPI = {
    // Example
    getPosts: (authorization: string) => {
      return this.clients.postsClient.get('/posts', {
        headers: {
          authorization,
        },
      });
    },
  };
  notificationsAPI = {
    // Example
    getNotifications: (authorization: string) => {
      return this.clients.notificationsClient.get('/notifications', {
        headers: {
          authorization,
        },
      });
    },
  };
  uploadAPI = {
    // Example
    uploadFile: (authorization: string) => {
      return this.clients.uploadClient.post('/files', {
        headers: {
          authorization,
        },
      });
    },
  };
}
