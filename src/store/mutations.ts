/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { MutationTree } from 'vuex';
import { AuthState } from '@/store/states';

export interface Mutations<S = AuthState> {
  token(store: S, token?: string): void;

  ttl(store: S, ttl?: number): void;

  message(store: S, message?: string): void;
}

export const mutations: MutationTree<AuthState> & Mutations = {
  /**
   * Passing `undefined`, `null`, or empty string to clear the token.
   *
   * @param state
   * @param token
   */
  token(state, token?: string) {
    state.token = token;
  },

  ttl(state, ttl?: number) {
    if (undefined === ttl) return;
    state.ttl = ttl;
  },

  message(state, message?: string) {
    if (undefined === message) return;
    const m = Array.isArray(state.messages) ? state.messages.slice() : [];
    m.push(message);
    state.messages = m;
  },
};
