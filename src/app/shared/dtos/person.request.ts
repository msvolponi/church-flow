
import { Gender } from '../enums/gender';
import { MaritalStatus } from '../enums/marital-status';
import { MemberType } from '../enums/member-type';
import { State } from '../enums/states';

export interface PersonRequest {
  id?: number;
  fullName: string;
  memberType?: MemberType;
  gender?: Gender;
  birthDate?: string;
  maritalStatus?: MaritalStatus;
  spouseId?: number;
  cellphone?: string;
  phone?: string;
  email?: string;
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: State;
  memberSince?: string;
  baptizedInWater?: boolean;
  baptismDate?: string;
  profession?: string;
  observations?: string;
}