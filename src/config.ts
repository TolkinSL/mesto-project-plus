import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mestodb',
  SECRET_KEY: process.env.SECRET_KEY || 'some-secret-key',
};

export default config;
