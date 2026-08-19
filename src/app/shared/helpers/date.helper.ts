export const MONTH_NAMES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function parseYMD(dateStr: string): Date | null {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length < 3) return null;
    const y = Number(parts[0]);
    const m = Number(parts[1]);
    const d = Number(parts[2]);
    if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return null;
    return new Date(y, m - 1, d);
}

export function getCurrentMonthIndex(): number {
    return new Date().getMonth();
}

export function formatMonthPt(monthIndex: number): string {
    return MONTH_NAMES_PT[monthIndex] || '';
}

export function calculateAge(birthDateStr: string): number | null {
    const d = parseYMD(birthDateStr);
    if (!d) return null;
    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
        age--;
    }
    return age;
}

export function isBirthdayThisMonth(birthDateStr: string): boolean {
    const d = parseYMD(birthDateStr);
    if (!d) return false;
    return d.getMonth() === getCurrentMonthIndex();
}

export function isBirthdayToday(birthDateStr: string): boolean {
    const d = parseYMD(birthDateStr);
    if (!d) return false;
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
}

export function getNextBirthdayDate(birthDateStr: string): Date | null {
    const d = parseYMD(birthDateStr);
    if (!d) return null;
    const today = new Date();
    const year = today.getFullYear();
    const candidate = new Date(year, d.getMonth(), d.getDate());
    if (candidate >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        return candidate;
    }
    return new Date(year + 1, d.getMonth(), d.getDate());
}

export function daysUntil(date: Date): number {
    const today = new Date();
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return Math.round((d - t) / 86400000);
}

export function isNewMemberThisMonth(memberSinceStr: string): boolean {
    if (!memberSinceStr) return false;
    const d = parseYMD(memberSinceStr);
    if (!d) return false;
    const today = new Date();
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
}
