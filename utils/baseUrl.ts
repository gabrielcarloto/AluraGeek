const DEV_ENV = process.env.NODE_ENV !== 'production';

export const BASE_URL = DEV_ENV
  ? `http://localhost:3000/api`
  : 'https://alura-geek-mocha.vercel.app/api';
