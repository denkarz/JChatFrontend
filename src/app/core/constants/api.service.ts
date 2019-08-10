import axios from 'axios';
import env from './env.variable';
import {getCookie} from '@/app/core/service/cookie';

export const HTTP = {
  auth_api: axios.create({baseURL: env.AUTH_API}),
  api: axios.create({
    baseURL: env.API,
    headers: {Authorisation: getCookie('JWT')},
  }),
};
