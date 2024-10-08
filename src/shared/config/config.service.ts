import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

/**
 * Config services.
 *
 * @export
 * @class ConfigService
 */
@Injectable()
export class ConfigService {
  /**
   * Contains an object with the system settings.
   *
   * @private
   * @type {{ [prop: string]: string }}
   * @memberof ConfigService
   */
  private readonly envConfig: { [prop: string]: string };

  /**
   * Creates an instance of ConfigService.
   *
   * @param {string} filePath
   * @memberof ConfigService
   */
  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  /**
   * Get the value of the configuration by the key.
   *
   * @param {string} key
   * @returns {any}
   * @memberof ConfigService
   */
  get(key: string): any {
    return this.envConfig[key];
  }
}
