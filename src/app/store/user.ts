import {User} from '@/app/core/model/user';
import {HTTP} from '@/app/core/constants/api.service';
import {plainToClass} from 'class-transformer';
import {deleteCookie, parseJWT, putCookie} from '@/app/core/service/cookie';

interface JWT {
  role: string[];
  user_id: string;
}

export const state = {
  user: new User(),
  jwt: {} as JWT,
};
export const mutations = {
  LOGOUT(vue_state, payload: string): void {
    deleteCookie('JWT');
    vue_state.jwt = {};
  },
  SET_JWT(vue_state, payload: string): void {
    putCookie('JWT', payload, {path: '/'});
    vue_state.jwt = parseJWT(payload);
  },
  SET_USER(vue_state, payload: User): void {
    vue_state.user = plainToClass(User, {});
    vue_state.user = plainToClass(User, payload);
  },
};
export const actions = {
  logout({commit}, payload: string): Promise<void | User> {
    return HTTP.api.post('user/logout', {id: payload})
      .then((response) => {
        commit('LOGOUT', response.data);
      });
  },
  // f
  set_user({commit}, payload: string): Promise<void | User> {
    return HTTP.api.get('user/get', {params: {id: payload}})
      .then((response) => {
        commit('SET_USER', response.data);
      });
  },
  set_jwt({commit}, payload: string): void {
    commit('SET_JWT', payload);
  },
};
export const getters = {
  current_user() {
    return state.user;
  },
  _jwt() {
    return state.jwt;
  },
};
