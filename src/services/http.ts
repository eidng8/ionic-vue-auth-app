/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
import { HttpOptions, HttpPlugin } from '@capacitor-community/http';
import {
  Credential,
  LoginSuccess,
  RegisterSuccess,
  Registration,
  ResponseMessage,
} from '@/types/http';
import { Heartbeat } from '@/models/heartbeat';

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
      headers: config.headers,
      readTimeout: config.timeout,
      connectTimeout: config.timeout,
      webFetchExtra: {
        credentials: config.withCredentials ? 'include' : 'same-origin',
      },
    };
    if (
      -1 == ['get', 'head'].indexOf(options.method?.toLowerCase() || '') &&
      'string' == typeof config.data
    ) {
      // axios has done the conversion
      options.data = JSON.parse(config.data);
    }
    return http
      .request(options)
      .then(res => {
        const response = { config, ...res } as AxiosResponse;
        if (res.status >= 300) {
          response.data = new Error(
            res.data.exception || res.data.message || 'Error occured.',
          );
          if ('object' == typeof res.data) {
            response.data.data = res.data;
          }
        }
        return response;
      })
      .catch(err => {
        return { data: err } as AxiosResponse;
      });
  };
}

export function hasToken(token?: string): boolean {
  return 'string' == typeof token && token.length > 0;
}

async function post<T, R>(
  uri: string,
  token?: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<R> {
  const cfg = config || {};
  cfg.url = uri;
  cfg.data = data;
  cfg.method = 'POST';
  if (hasToken(token)) {
    cfg.headers = cfg.headers || {};
    cfg.headers['Authorization'] = `bearer ${token}`;
  }
  return axios(cfg).then(r => r.data);
}

export async function login(credential: Credential): Promise<LoginSuccess> {
  return post<Credential, LoginSuccess>('/login', undefined, credential);
}

export function register(user: Registration): Promise<RegisterSuccess> {
  return post<Registration, RegisterSuccess>('/register', undefined, user);
}

export function logout(token?: string): Promise<ResponseMessage> {
  return post<undefined, ResponseMessage>('/logout', token);
}

export async function refresh(token?: string): Promise<LoginSuccess> {
  return post<Credential, LoginSuccess>('/refresh', token);
}

export async function heartbeat(token?: string): Promise<Heartbeat> {
  return post<Credential, Heartbeat>('/heartbeat', token);
}
