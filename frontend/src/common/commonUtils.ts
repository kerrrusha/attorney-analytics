import {KeyValueChartData} from "./commonTypes";

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
            ($1, $2, $3) => `${$1}`
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