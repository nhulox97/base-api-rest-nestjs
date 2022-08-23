import { Transform } from 'class-transformer';
import { TransformParams } from '../interfaces/transform-params.interface';

/**
 * Parse input to lowercase
 *
 * @param input
 * @returns Lower cased input
 */
export const stringToLowerCase = ({ value: input }: TransformParams) =>
  input
    ? typeof input === 'string'
      ? input?.toLowerCase()
      : input?.map((i) => i?.toLowerCase())
    : input;

/**
 * Transform a string or string list to lower case
 *
 * @returns Lower cased input
 */
export function StringToLowerCase() {
  return Transform(stringToLowerCase, { toClassOnly: true });
}
