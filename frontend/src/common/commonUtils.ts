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

export function createOptionsHoverLabelWithPostfix(keyValueData: Array<KeyValueChartData>, postfix: string,
                                                   display=true): any {
    return {
        plugins: {
            legend: {
                position: "bottom",
                display
            },
            tooltip: {
                callbacks: {
                    label: (context: { dataIndex: number; }) => {
                        const label = keyValueData.map((data) => data.key)[context.dataIndex] || '';
                        const value = keyValueData.map((data) => data.value)[context.dataIndex] || 0;
                        const total = keyValueData.map((data) => data.value).reduce((acc, curr) => acc + curr, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value}${postfix} (${percentage}%)`;
                    },
                },
            },
        },
    };
}

export function createChartData(keyValueData: Array<KeyValueChartData>): any {
    return {
        labels: keyValueData.map((data) => data.key),
        datasets: [
            {
                data: keyValueData.map((data) => data.value),
                backgroundColor: generateRandomColors(keyValueData.length),
                borderColor: "black",
                borderWidth: 1
            }
        ]
    };
}
