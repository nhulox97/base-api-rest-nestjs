import { Transform } from 'class-transformer';
import { TransformParams } from '../interfaces/transform-params.interface';

/**
 * Trim a string value or each value from a string list
 *
 * @param input
 * @returns Trimmed input
 */
export const trimString = ({ value: input }: TransformParams) =>
  input ? (typeof input === 'string' ? input?.trim() : input?.map((i) => i?.trim())) : input;

/**
 * Trim string input
 *
 * @returns Trimmed data
 */
export function TrimString() {
  return Transform(trimString, { toClassOnly: true });
}
