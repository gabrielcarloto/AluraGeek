const DEV_ENV = process.env.NODE_ENV !== 'production';

export const BASE_URL = DEV_ENV
  ? `http://localhost:3000`
  : 'https://alura-geek-mocha.vercel.app';

export const BASE_API_URL = BASE_URL + '/api';
