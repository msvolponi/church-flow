export interface EnumOption<T> {
    label: string;
    value: T;
}

export class EnumHelper {

    static getEnumLabel<T>(
        options: EnumOption<T>[],
        value: T
    ): string {
        return options.find(option => option.value === value)?.label ?? '';
    }
}