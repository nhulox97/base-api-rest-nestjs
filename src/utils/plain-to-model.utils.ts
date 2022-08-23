import { ClassConstructor, plainToInstance } from 'class-transformer';

export function plainToModel<T, V>(cls: ClassConstructor<T>, data: V);
export function plainToModel<T, V>(cls: ClassConstructor<T>, data: V[]);
export function plainToModel<T, V>(cls: ClassConstructor<T>, data: V | V[]) {
  return plainToInstance(cls, data, { excludeExtraneousValues: true });
}
