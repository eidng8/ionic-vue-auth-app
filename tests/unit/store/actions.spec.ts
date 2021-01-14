/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { AuthState } from '@/store';
import { actions } from '@/store/actions';
import { mutations } from '@/store/mutations';

describe('Vuex store', () => {
  describe('actions', () => {
    it('sets token', () => {
      const state: AuthState = {};
      const token = 'just a token';
      const mock = jest.fn((t, p) => mutations[t](state, p));
      actions.token({ state, commit: mock as any } as any, token);
      expect(state.token).toBe(token);
    });
    it('sets TTL', () => {
      const state: AuthState = {};
      const ttl = 12345;
      const mock = jest.fn((t, p) => mutations[t](state, p));
      actions.ttl({ state, commit: mock as any } as any, ttl);
      expect(state.ttl).toBe(ttl);
    });
  });
});
