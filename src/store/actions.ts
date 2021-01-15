/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { ActionContext, ActionTree } from 'vuex';
import { AuthState } from '@/store/states';
import { Mutations } from '@/store/mutations';
import { Credential, Registration } from '@/types/http';
import { heartbeat, login, logout, refresh, register } from '@/services/http';
import { User } from '@/models/user';

function hasError(commit: any, response: any): boolean {
  if ('string' == typeof response) {
    commit('message', response);
    return true;
  }
  if (response instanceof Error) {
    commit('message', response.message || (response as any).exception);
    return true;
  }
  return false;
}

export const enum AllActions {
  login = 'login',
  register = 'register',
  refresh = 'refresh',
  logout = 'logout',
  heartbeat = 'heartbeat',
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AuthState, AuthState>, 'commit'>;

export interface Actions {
  login({ commit }: AugmentedActionContext, payload: Credential): void;

  refresh({ commit }: AugmentedActionContext, payload: Credential): void;

  logout({ commit }: AugmentedActionContext, payload: Credential): void;

  heartbeat({ commit }: AugmentedActionContext, payload: Credential): void;

  register({ commit }: AugmentedActionContext, payload: Credential): void;
}

export const actions: ActionTree<AuthState, AuthState> & Actions = {
  login({ commit }, credential: Credential) {
    login(credential).then(response => {
      if (hasError(commit, response)) return;
      commit('token', response.token);
      commit('ttl', response.expires_in);
      commit(
        'message',
        'Got token: ' +
          response.token.substr(0, 10) +
          ' ...... ' +
          response.token.substr(-10),
      );
    });
  },

  logout({ commit, state }) {
    logout(state.token).then(response => {
      if (hasError(commit, response)) return;
      commit('token', undefined);
      commit('message', response.message);
    });
  },

  register({ commit }, user: Registration) {
    register(user).then(response => {
      if (hasError(commit, response)) return;
      commit(
        'message',
        response.message +
          '\nCreated user:\n' +
          JSON.stringify(new User(response), undefined, '  '),
      );
    });
  },

  refresh({ commit, state }) {
    refresh(state.token).then(response => {
      if (hasError(commit, response)) return;
      commit('token', response.token);
      commit('ttl', response.expires_in);
      commit(
        'message',
        'Refreshed token: ' +
          response.token.substr(0, 10) +
          ' ...... ' +
          response.token.substr(-10),
      );
    });
  },

  heartbeat({ commit, state }) {
    heartbeat(state.token).then(response => {
      if (hasError(commit, response)) return;
      commit('message', `Heartbeat: ${response.time}`);
    });
  },
};
