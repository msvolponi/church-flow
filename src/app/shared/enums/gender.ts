export enum Gender {
  MALE = 'Masculino',
  FEMALE = 'Feminino',
  OTHER = 'Outro'
}

export const GenderOptions = {
  OPTIONS: [
    { label: 'Masculino', value: Gender.MALE },
    { label: 'Feminino', value: Gender.FEMALE },
    { label: 'Outro', value: Gender.OTHER },
  ]
};
