import {KeyValueData} from "./commonTypes";
import {generateRandomColors, toPascalCase} from "./commonUtils";
import {Bar, Doughnut} from "react-chartjs-2";
import React from "react";

export function createIncomeOutcomeChart(incomeData: Array<KeyValueData>, outcomeData: Array<KeyValueData>) {
    return <Bar data={createIncomeOutcomeChartData(incomeData, outcomeData)}
                options={createIncomeOutcomeOptions()} />;
}

function createIncomeOutcomeChartData(incomeData: Array<KeyValueData>, outcomeData: Array<KeyValueData>): any {
    const getValue = (keyValue: KeyValueData) => keyValue ? keyValue.value : 0;

    return {
        labels: incomeData.map((data) => toPascalCase(data.key)),
        datasets: [
            {
                data: incomeData.map((data) => data.value),
                backgroundColor: 'green',
                borderColor: "black",
                borderWidth: 1,
                stack: 'Stack 1',
                label: 'Income',
                order: 2
            },
            {
                data: outcomeData.map((data) => -data.value),
                backgroundColor: 'red',
                borderColor: "black",
                borderWidth: 1,
                stack: 'Stack 1',
                label: 'Outcome',
                order: 2
            },
            {
                label: 'Profit',
                data: incomeData.map((_, index) => getValue(incomeData[index]) - getValue(outcomeData[index])),
                backgroundColor: 'blue',
                borderColor: "black",
                borderWidth: 1,
                type: 'line',
                order: 1
            }
        ]
    };
}

function createIncomeOutcomeOptions(): any {
    return {
        plugins: {
            responsive: true,
            interaction: {
                intersect: false,
            },
            legend: {
                position: "bottom",
                display: true
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            },
        }
    };
}

export function createSimpleDoughnut(keyValueData: Array<KeyValueData>) {
    return <Doughnut data={createChartData(keyValueData)} options={createOptionsHoverLabelWithPostfix(keyValueData, "$")} />;
}

function createOptionsHoverLabelWithPostfix(keyValueData: Array<KeyValueData>, postfix: string,
                                            display=true): any {
    return {
        plugins: {
            legend: {
                position: "bottom",
                display
            },
            interaction: {
                intersect: false,
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

function createChartData(keyValueData: Array<KeyValueData>): any {
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
