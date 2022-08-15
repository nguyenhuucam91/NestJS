export default () => ({
  database: {
    default: process.env.DB_CONNECTION || 'mysql',
    
    mysql: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3600,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  }
});