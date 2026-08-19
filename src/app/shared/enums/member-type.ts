export enum MemberType {
  VISITOR = 'VISITOR',
  MEMBER = 'MEMBER',
  PASTOR = 'PASTOR'
}

export const MemberTypeOptions = {
  OPTIONS: [
    { label: 'Visitante', value: MemberType.VISITOR },
    { label: 'Membro', value: MemberType.MEMBER },
    { label: 'Pastor', value: MemberType.PASTOR },
  ]
};