/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { createApp } from 'vue';
import axios, { AxiosResponse } from 'axios';
import VueAxios from 'vue-axios';

import { IonicVue } from '@ionic/vue';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';

import App from './App.vue';
import router from './router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { HttpOptions } from '@capacitor-community/http';

const { Http } = Plugins;

axios.defaults.baseURL = 'http://172.28.47.46';
axios.defaults.adapter = config => {
  const options: HttpOptions = {
    url: new URL(config.url || '', config.baseURL).toString(),
    method: config.method,
    params: config.params,
    data: config.data,
    headers: config.headers,
    readTimeout: config.timeout,
    connectTimeout: config.timeout,
    webFetchExtra: {
      credentials: config.withCredentials ? 'include' : 'same-origin',
    },
  };
  return Http.request(options).then(
    res => ({ config, ...res } as AxiosResponse),
  );
};

const app = createApp(App).use(IonicVue).use(router).use(VueAxios, axios);

router.isReady().then(() => app.mount('#app'));
