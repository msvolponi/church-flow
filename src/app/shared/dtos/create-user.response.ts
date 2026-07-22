import { Role } from '../enums/role';

export interface CreateUserResponse {
  id: string,
  email: string,
  name: string,
  password: string
  role: Role
}
