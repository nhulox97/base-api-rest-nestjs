import { Transform } from 'class-transformer';
import { TransformParams } from '../interfaces/transform-params.interface';

const replaceSingleQuote = (s: string) => s.replace(/''?('*)/g, "''$1");

/**
 * Escape single quotes in string or string arrays, in order to avoid postgresql errors when you
 * query by using that char
 *
 * @param value
 * @returns Value with single quotes escaped
 */
export const escapeSingleQuote = ({ value }: TransformParams) =>
  typeof value === 'string' ? replaceSingleQuote(value) : value.map((s) => replaceSingleQuote(s));

/**
 * Replace single quotes with double single quotes due to a postgresql constraint that
 * do not let query or save values that contains the single quote char. You can use this
 * Decorator with single strings or string arrays as well.
 * Here is an example: Miller's => Miller''s
 */
export function EscapeSingleQuote() {
  return Transform(escapeSingleQuote, { toClassOnly: true });
}
