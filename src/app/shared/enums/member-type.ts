export enum MemberType {
  VISITOR = 'Visitante',
  MEMBER = 'Membro',
  ATTENDANT = 'Congregado'
}

export const MemberTypeOptions = {
  OPTIONS: [
    { label: 'Visitante', value: MemberType.VISITOR },
    { label: 'Congregado', value: MemberType.ATTENDANT },
    { label: 'Membro', value: MemberType.MEMBER },
  ]
};
