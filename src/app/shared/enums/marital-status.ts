export enum MaritalStatus {
  SINGLE = 'Solteiro(a)',
  MARRIED = 'Casado(a)',
  DIVORCED = 'Divorciado(a)',
  WIDOWED = 'Viúvo(a)'
}

export const MaritalStatusOptions = {
  OPTIONS: [
    { label: 'Solteiro(a)', value: MaritalStatus.SINGLE },
    { label: 'Casado(a)', value: MaritalStatus.MARRIED },
    { label: 'Divorciado(a)', value: MaritalStatus.DIVORCED },
    { label: 'Viúvo(a)', value: MaritalStatus.WIDOWED },
  ]
};
