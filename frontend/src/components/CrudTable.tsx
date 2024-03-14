import React, {useEffect, useState} from "react";

interface CrudTableProps {
    name: string,
    initialData_: TableData,
    postDataHandler: (data: TableData) => Promise<any>;
    disabled?: boolean
}

export interface TableData {
    rows: Array<string>
}

export default function CrudTable({name, initialData_, postDataHandler, disabled=false}: CrudTableProps) {
    const [initialData, setInitialData] = useState(initialData_);
    const [data, setData] = useState(initialData);
    const [canSave, setCanSave] = useState(false);
    const tableId = name + "-table";

    const saveData = (event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        postDataHandler(data!).then(result => {
            console.log("Updated data:");
            console.log(result);

            setInitialData(data);
            setCanSave(false);
        });
    };

    const createEmptyRow = (event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setData(prevData => {return {rows: [...prevData.rows, ""]}});
    };

    const deleteRow = (event : React.MouseEvent<HTMLElement>, indexToDelete: number) => {
        event.preventDefault();

        setData(prevData => {
            const rows = prevData.rows.filter((_, index) => index !== indexToDelete);
            return {rows};
        });
    };

    const handleChange = () => {
        const rows = readTableRows();
        setData({rows});
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
        if (data === initialData) {
            setCanSave(false);
            return;
        }
        setCanSave(true);
    }, [initialData, data]);

    return <div className="flex flex-row items-center">
        <div className="flex-1">
            <table id={tableId} className="m-0 table table-bordered bg-white">
                <tbody>
                {data.rows.map((row, index) => (
                    <tr key={index}>
                        <th scope="row" className="p-1 m-0">
                            <input
                                disabled={disabled}
                                value={row}
                                type="text"
                                onChange={handleChange}
                                className="text-black w-100 border-0"
                            />
                        </th>
                        <td>
                            <button onClick={event => deleteRow(event, index)}>
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
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={2} className="text-center">
                        <button disabled={disabled} onClick={createEmptyRow} className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path d="M4 12H20M12 4V20" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <button disabled={disabled || !canSave} onClick={saveData} className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
        </button>
    </div>;
}
