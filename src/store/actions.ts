/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { ActionContext, ActionTree } from 'vuex';
import { AuthState } from '@/store/states';
import { Mutations } from '@/store/mutations';
import { Credential } from '@/types/Credential';
import { login } from '@/services/http';

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AuthState, AuthState>, 'commit'>;

export interface Actions {
  token({ commit }: AugmentedActionContext, payload: string): void;

  ttl({ commit }: AugmentedActionContext, payload: number): void;

  login({ commit }: AugmentedActionContext, payload: Credential): void;
}

export const actions: ActionTree<AuthState, AuthState> & Actions = {
  token({ commit }, token: string) {
    commit('token', token);
  },

  ttl({ commit }, ttl: number) {
    commit('ttl', ttl);
  },

  login({ commit }, credential: Credential) {
    login(credential).then(response => {
      commit('token', response.data.token);
      commit('ttl', response.data.expires_in);
      commit(
        'message',
        'Got token: ' +
          response.data.token.substr(0, 10) +
          ' ...... ' +
          response.data.token.substr(-10),
      );
    });
  },
};
