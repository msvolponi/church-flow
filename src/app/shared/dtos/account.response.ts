import { Role } from '../enums/role';

export interface AccountResponse {
  id: number,
  email: string,
  name: string,
  password: string
  role: Role
}
