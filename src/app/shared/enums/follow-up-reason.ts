export enum FollowUpReason {
    HOSPITALIZATION = 'HOSPITALIZATION',
    ILLNESS = 'ILLNESS',
    BIRTH = 'BIRTH',
    MARRIAGE = 'MARRIAGE',
    MOURNING = 'MOURNING',
    PRAYER_REQUEST = 'PRAYER_REQUEST',
    FAMILY = 'FAMILY',
    FOLLOW_UP = 'FOLLOW_UP',
    CELEBRATION = 'CELEBRATION',
    OTHER = 'OTHER'
}

export const FollowUpReasonOptions = {
    OPTIONS: [
        { label: 'Hospitalização', value: FollowUpReason.HOSPITALIZATION },
        { label: 'Doença', value: FollowUpReason.ILLNESS },
        { label: 'Nascimento', value: FollowUpReason.BIRTH },
        { label: 'Casamento', value: FollowUpReason.MARRIAGE },
        { label: 'Luto', value: FollowUpReason.MOURNING },
        { label: 'Pedido de oração', value: FollowUpReason.PRAYER_REQUEST },
        { label: 'Família', value: FollowUpReason.FAMILY },
        { label: 'Acompanhamento', value: FollowUpReason.FOLLOW_UP },
        { label: 'Celebração', value: FollowUpReason.CELEBRATION },
        { label: 'Outro', value: FollowUpReason.OTHER }
    ]
};
