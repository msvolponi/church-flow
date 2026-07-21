export enum Role {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    OPERATOR = 'OPERATOR'
}

export class RoleOptions {

    static readonly OPTIONS = [
        { label: 'Administrador', value: Role.ADMIN },
        { label: 'Gestor', value: Role.MANAGER },
        { label: 'Operador', value: Role.OPERATOR }
    ];

    static getLabel(role: Role): string {
        return this.OPTIONS.find(x => x.value === role)?.label ?? '';
    }

}