import { InternalServerErrorException } from '@nestjs/common';
import { AxiosInstance } from 'axios';

export default {
  // Example for adding request headers
  addHeader: (client: AxiosInstance) => {
    client.interceptors.request.use(
      (config) => {
        config.headers['x-foo-bar'] = 'xyz';
        return config;
      },
      (error) => {
        // just an example
        console.log(error);
        throw InternalServerErrorException;
      },
    );
  },

  //Example for changing response data
  changeData: (client: AxiosInstance) => {
    client.interceptors.response.use(
      (res) => {
        res.data = 'xyz';
        return res;
      },
      (error) => {
        // just an example
        console.log(error);
        throw InternalServerErrorException;
      },
    );
  },
};
