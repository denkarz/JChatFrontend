import axios from 'axios';
import env from './env.variable';


export const HTTP = axios.create({
  baseURL: env.API,
});
