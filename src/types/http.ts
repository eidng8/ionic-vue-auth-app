/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

export interface UserBase {
  name: string;
  email: string;
}

export interface UserData extends UserBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Credential {
  email: string;
  password: string;
}

export interface Registration extends UserBase, Credential {
  password_confirmation: string;
}

export interface ResponseMessage {
  message: string;
}

export interface ResponseTime {
  time: string;
}

export interface LoginSuccess {
  token: string;
  token_type: 'bearer';
  expires_in: number;
}

export interface RegisterSuccess extends ResponseMessage {
  user: UserBase & {
    id: number;
    created_at: string;
    updated_at: string;
  };
}
