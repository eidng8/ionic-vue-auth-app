/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { AuthState } from '@/store/states';
import { mutations } from '@/store/mutations';

describe('Vuex store', () => {
  describe('mutations', () => {
    it('sets token', () => {
      const state: AuthState = {};
      const token = 'just a token';
      mutations.token(state, token);
      expect(state.token).toBe(token);
    });
    it('sets TTL', () => {
      const state: AuthState = {};
      const ttl = 12345;
      mutations.ttl(state, ttl);
      expect(state.ttl).toBe(ttl);
    });
  });
});
