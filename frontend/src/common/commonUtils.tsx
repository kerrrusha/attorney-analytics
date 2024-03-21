import {DANGER_COLOR_CLASSNAME, NEUTRAL_COLOR_CLASS_NAME, SUCCESS_COLOR_CLASSNAME} from "./constants";
import {IdNamePair, IdValuePair} from "./commonTypes";

export function fixNull(value: string | null): string {
    return value === null ? "" : value;
}

// hello-world
export function toKebabCase(str: string) {
    return str.toLowerCase().replace(/\s+/g, '-');
}

// HelloWorld
export function toPascalCase(str: string) {
    return `${str}`
        .toLowerCase()
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(
            new RegExp(/\s+(.)(\w*)/, 'g'),
            ($1) => `${$1}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}

export function generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(randomColor);
    }
    return colors;
}

export function haveIntersections<T>(list1: T[], list2: T[]): boolean {
    const set1 = new Set(list1);
    for (const item of list2) {
        if (set1.has(item)) {
            return true;
        }
    }
    return false;
}

export function createNumberList(N: number): Array<number> {
    let list = [];
    for (let i = 0; i < N; i++) {
        list.push(i);
    }
    return list;
}

export const getStatusColorClass = (status: string) => {
    if (!status) {
        return "";
    }
    status = status.toUpperCase();
    if (status === "SUCCESS") {
        return SUCCESS_COLOR_CLASSNAME;
    }
    if (status === "FAILED" || status === "REJECTED") {
        return DANGER_COLOR_CLASSNAME;
    }
    return NEUTRAL_COLOR_CLASS_NAME;
}

export const getProfitColorClass = (profit: number) => {
    if (profit > 0) {
        return SUCCESS_COLOR_CLASSNAME;
    }
    if (profit < 0) {
        return DANGER_COLOR_CLASSNAME;
    }
    return NEUTRAL_COLOR_CLASS_NAME;
}

export const getProfitChar = (profit: number) => {
    if (profit > 0) {
        return '▲';
    }
    if (profit < 0) {
        return '▼';
    }
    return '';
}

export const getPaymentStatusIcon = (type: string) => {
    const logoUrl = type === "INCOME"
        ? "https://cdn-icons-png.flaticon.com/512/4721/4721635.png "
        : "https://cdn-icons-png.flaticon.com/512/4721/4721643.png";
    return <img src={logoUrl} alt="" width={25}></img>;
};

export const formatNumber = (value: number): string => {
    return value.toFixed(2);
};

export function mapToIdValues(idNamePairs: IdNamePair[]): IdValuePair[] {
    return idNamePairs.map(pair => ({id: pair.id, value: pair.name}));
}
