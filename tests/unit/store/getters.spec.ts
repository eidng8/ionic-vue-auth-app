/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { AuthState } from '@/store';
import { getters } from '@/store/getter';

describe('Vuex store', () => {
  describe('getters', () => {
    it('gets token', () => {
      const state: AuthState = { token: 'just a token' };
      expect(getters.token(state)).toBe('just a token');
    });
    it('gets TTL', () => {
      const state: AuthState = { ttl: 12345 };
      expect(getters.ttl(state)).toBe(12345);
    });
  });
});
