import { Role } from '../enums/role';

export interface AccountRequest {
  id?: number,
  email: string,
  name: string,
  password: string
  role: Role
}
