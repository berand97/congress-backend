import { Menu } from "@modules/menu/entities/menu.entity";
import { Authentication } from "../entities/authentication.entity";

/**
 * Tokens.
 *
 * @export
 * @interface Tokens
 */
export interface Tokens {
  token: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  menu?: Menu[];
}
