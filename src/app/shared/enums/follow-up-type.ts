export enum FollowUpType {
    VISIT = 'VISIT',
    PHONE_CALL = 'PHONE_CALL',
    MESSAGE = 'MESSAGE',
    COUNSELING = 'COUNSELING',
    PRAYER = 'PRAYER',
    OTHER = 'OTHER'
}

export const FollowUpTypeOptions = {
    OPTIONS: [
        { label: 'Visita', value: FollowUpType.VISIT, icon: 'pi pi-home' },
        { label: 'Ligação', value: FollowUpType.PHONE_CALL, icon: 'pi pi-phone' },
        { label: 'Mensagem', value: FollowUpType.MESSAGE, icon: 'pi pi-comment' },
        { label: 'Aconselhamento', value: FollowUpType.COUNSELING, icon: 'pi pi-comments' },
        { label: 'Oração', value: FollowUpType.PRAYER, icon: 'pi pi-heart' },
        { label: 'Outro', value: FollowUpType.OTHER, icon: 'pi pi-file' }
    ]
};
