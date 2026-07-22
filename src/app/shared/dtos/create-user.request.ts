import { Role } from '../enums/role';

export interface CreateUserRequest {
  email: string,
  name: string,
  password: string
  role: Role
}
