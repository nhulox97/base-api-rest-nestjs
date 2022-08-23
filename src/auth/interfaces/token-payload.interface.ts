export interface TokenPayload {
  permissions?: string[];
  roles?: string[];
  email: string;
  sub: number;
}
