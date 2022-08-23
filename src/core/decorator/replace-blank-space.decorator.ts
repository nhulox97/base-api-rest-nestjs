import { Transform } from 'class-transformer';
import { TransformParams } from '../interfaces/transform-params.interface';

/**
 * Takes a value which will be string to replace the blank spaces
 *
 * @param input - String/array input
 * @param toReplace - String which blank spaces will be replaced
 * @returns String with blank spaces replaces
 */
export function replaceBlankSpace({ value: input }: TransformParams, toReplace: string) {
  return typeof input === 'string'
    ? input?.replace(/ /g, toReplace)
    : input?.map((val) => val?.replace(/ /g, toReplace));
}

/**
 * Takes a value which will be string to replace the blank spaces, ideally the
 * input should be trimed
 *
 * @param toReplace - String which blank spaces will be replaced
 * @returns String with blank spaces replaces
 */
export function ReplaceBlankSpace(toReplace: string) {
  return Transform((input) => replaceBlankSpace(input, toReplace), {
    toClassOnly: true,
  });
}
