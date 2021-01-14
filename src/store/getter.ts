/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { GetterTree } from 'vuex';
import { AuthState } from '@/store/states';

export interface Getters {
  token(store: AuthState): string | undefined;

  ttl(store: AuthState): number | undefined;

  messages(store: AuthState): string[];
}

export const getters: GetterTree<AuthState, AuthState> & Getters = {
  token(state) {
    return state.token;
  },

  ttl(state) {
    return state.ttl;
  },

  messages(state) {
    return state.messages || [];
  },
};
