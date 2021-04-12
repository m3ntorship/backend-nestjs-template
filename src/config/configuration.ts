export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  clients: {
    posts: {
      baseURL: 'http://localhost:3002',
    },
    notifications: {
      baseURL: 'http://localhost:3004',
    },
    upload: {
      baseURL: 'http://localhost:3002',
    },
    media: {
      baseURL: 'http://localhost:3003',
    },
  },
});
