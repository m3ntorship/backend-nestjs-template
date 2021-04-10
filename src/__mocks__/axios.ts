export const mockAxiosInstance = {
  get: jest.fn().mockReturnValue('axios-get-promise'),
  post: jest.fn().mockReturnValue('axios-post-promise'),
};

const axios = {
  create: jest.fn().mockReturnValue(mockAxiosInstance),
  ...mockAxiosInstance,
};

export default axios;
