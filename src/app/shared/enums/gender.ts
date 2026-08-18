export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export const GenderOptions = {
  OPTIONS: [
    { label: 'Masculino', value: Gender.MALE },
    { label: 'Feminino', value: Gender.FEMALE },
    { label: 'Outro', value: Gender.OTHER },
  ]
};
