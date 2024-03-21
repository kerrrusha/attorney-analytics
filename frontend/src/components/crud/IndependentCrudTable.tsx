import React, {useEffect, useState} from "react";

interface IndepententCrudTableProps {
    name: string,
    handleChange_: (rows: string[]) => any;
    initialRows?: string[],
    disabled?: boolean
}

export default function IndepententCrudTable({name, handleChange_, initialRows=[], disabled=false}: IndepententCrudTableProps) {
    const [rows, setRows] = useState(initialRows);
    const [canAddNewRow, setCanAddNewRow] = useState(true);
    const tableId = name + "-table";

    const createEmptyRow = () => {
        setRows(prevRows => {
            const newRows = [...prevRows];
            newRows.push("");
            return newRows;
        });
    };

    const deleteRow = (event : React.MouseEvent<HTMLElement>, indexToDelete: number) => {
        event.preventDefault();

        setRows(prevRows => {
            return prevRows!.filter((_, index) => index !== indexToDelete);
        });
    };

    const handleChange = () => {
        const rows = readTableRows();
        setRows(rows);
        handleChange_(rows);
    };

    const readTableRows = () => {
        const table = getTable();

        const result = [];
        const rows = table.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const inputs = rows[i].getElementsByTagName('input');
            if (!inputs || inputs.length === 0) {
                continue;
            }
            const input = inputs[0];
            result.push(input.value);
        }

        return result;
    };

    const getTable = () => {
        const table = document.getElementById(tableId);
        if (!table) {
            throw new Error('Table not found');
        }
        return table;
    }

    useEffect(() => {
        const emptyRowsCount = rows.filter(row => row === null || row.length === 0).length;
        setCanAddNewRow(emptyRowsCount === 0);
    }, [rows]);

    return <div className="flex flex-row items-center">
        <div className="flex-1">
            <table id={tableId} className="m-0 table table-bordered bg-white table-rounded">
                <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <th scope="row" className="p-1 m-0">
                            <input
                                required
                                disabled={disabled}
                                value={row}
                                type="text"
                                onChange={handleChange}
                                className="text-black w-100 border-0 shadow-sm"
                            />
                        </th>
                        <td className="p-0">
                            <div className="overflow-hidden" style={{height:"3rem"}}>
                                <button onClick={event => deleteRow(event, index)} className="w-100 h-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <g id="Page-1" stroke="none" fill="none" fillRule="evenodd">
                                            <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000">
                                                <g transform="translate(56.000000, 160.000000)">
                                                    <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={2} className="text-center p-0">
                        <button disabled={disabled || !canAddNewRow} onClick={createEmptyRow} className="w-100 py-2 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path d="M4 12H20M12 4V20" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>;
}
