/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { RegisterSuccess, UserData } from '@/types/http';

export class User implements UserData {
  id!: number;
  name!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(user: UserData | RegisterSuccess) {
    let data: any = (user => (user as RegisterSuccess).user || user)(user);
    data = (({ id, name, email }) => ({ id, name, email }))(data);
    if (data.created_at) this.createdAt = new Date(data.created_at);
    if (data.updated_at) this.createdAt = new Date(data.updated_at);
    if (data.createdAt) this.createdAt = new Date(data.createdAt);
    if (data.updatedAt) this.createdAt = new Date(data.updatedAt);
  }
}
