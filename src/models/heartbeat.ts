/*
 * GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * author eidng8
 *
 */

import { ResponseTime } from '@/types/http';

export class Heartbeat {
  time: Date;

  constructor(time: string | ResponseTime) {
    this.time = new Date((time as any).time || time);
  }
}
