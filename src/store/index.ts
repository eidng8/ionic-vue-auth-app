/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import {
  CommitOptions,
  createLogger,
  createStore,
  DispatchOptions,
  Store as VuexStore,
} from 'vuex';
import { getters, Getters } from '@/store/getter';
import { AuthState } from '@/store/states';
import { mutations, Mutations } from '@/store/mutations';
import {
  actions,
  Actions,
  AllActions,
  AugmentedActionContext,
} from '@/store/actions';

// export type AppStore = Omit<
//   Store<AuthState>,
//   'getters' | 'commit' | 'dispatch'
// > & {
//   commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
//     key: K,
//     payload: P,
//     options?: CommitOptions,
//   ): ReturnType<Mutations[K]>;
// } & {
//   dispatch<K extends keyof Actions>(
//     key: K,
//     payload?: Parameters<Actions[K]>[1],
//     options?: DispatchOptions,
//   ): ReturnType<Actions[K]>;
// } & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>;
//   };
// };
const store = createStore<AuthState>({
  devtools: process.env.NODE_ENV != 'production',
  plugins: process.env.NODE_ENV != 'production' ? [createLogger()] : [],
  state: () => ({ messages: ['Welcome.'] }),
  mutations,
  actions,
  getters,
});

type Store = Omit<VuexStore<AuthState>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export {
  store,
  Store,
  AuthState,
  Getters,
  Mutations,
  Actions,
  AllActions,
  AugmentedActionContext,
};
