/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import axios, { AxiosResponse } from 'axios';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
import { HttpOptions, HttpPlugin } from '@capacitor-community/http';
import { Credential } from '@/types/Credential';

/**
 * Tell axios to use Capacitor's HTTP, and sets the base URL.
 *
 * @param urlBase
 * @param http
 */
export default function (
  urlBase: string,
  http = Plugins.Http as HttpPlugin,
): void {
  axios.defaults.baseURL = urlBase;

  // tell axios to use Capacitor HTTP
  axios.defaults.adapter = config => {
    const options: HttpOptions = {
      url: new URL(config.url || '', config.baseURL).toString(),
      method: config.method,
      params: config.params,
      data: JSON.parse(config.data), // axios has done the conversion
      headers: config.headers,
      readTimeout: config.timeout,
      connectTimeout: config.timeout,
      webFetchExtra: {
        credentials: config.withCredentials ? 'include' : 'same-origin',
      },
    };
    return http
      .request(options)
      .then(res => ({ config, ...res } as AxiosResponse));
  };
}

export interface LoginSuccess {
  token: string;
  token_type: 'bearer';
  expires_in: number;
}

export function login(credential: Credential) {
  return axios.post<LoginSuccess>('/login', credential);
}
