import { Expose } from 'class-transformer';

export class PermissionModel {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
