/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { mount } from '@vue/test-utils';
import moxios from 'moxios';
import Tab1 from '@/views/Tab1.vue';

describe('Tab1', () => {
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it('renders tab 1 view', done => {
    const wrapper = mount(Tab1);
    expect(wrapper.find('ion-card').isVisible()).toBeTruthy();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      expect(request.url).toBe('login');
      request
        .respondWith({
          status: 200,
          response: { token: 'just a test response' },
        })
        .then(() => done());
    });
  });
});
