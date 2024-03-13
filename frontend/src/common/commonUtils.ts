import {RgbColor} from "react-colorful";

export function generateRandomMongoId(): string {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomValue = Math.floor(Math.random() * 16777215).toString(16);
    return `${timestamp}0000000000000000${randomValue}`.slice(0, 24);
}

export function rgbToString(color: RgbColor): string {
    return `rgb(${color.r}, ${color.g}, ${color.b}`;
}

export function fixNull(value: string | null): string {
    return value === null ? "" : value;
}

export function toKebabCase(str : string) {
    return str.toLowerCase().replace(/\s+/g, '-');
}
