import { Role } from '../enums/role';

export interface CreateUserResponse {
  id: number,
  email: string,
  name: string,
  password: string
  role: Role
}
