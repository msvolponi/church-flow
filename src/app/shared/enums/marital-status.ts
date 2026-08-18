export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED'
}

export const MaritalStatusOptions = {
  OPTIONS: [
    { label: 'Solteiro(a)', value: MaritalStatus.SINGLE },
    { label: 'Casado(a)', value: MaritalStatus.MARRIED },
    { label: 'Divorciado(a)', value: MaritalStatus.DIVORCED },
    { label: 'Viúvo(a)', value: MaritalStatus.WIDOWED },
  ]
};
