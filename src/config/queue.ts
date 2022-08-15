export default () => ({
  queue: {
    default: 'redis',
    
    redis: {
      host: process.env.QUEUE_HOST || '127.0.0.1 ',
      port: process.env.QUEUE_PORT || 6379,
    }
  }
});