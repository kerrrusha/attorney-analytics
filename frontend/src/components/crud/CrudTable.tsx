import React, {useEffect, useState} from "react";

interface CrudTableProps {
    name: string,
    initialData_: Array<string>,
    postDataHandler: (data: Array<string>) => Promise<any>;
    disabled?: boolean
}

export default function CrudTable({name, initialData_, postDataHandler, disabled=false}: CrudTableProps) {
    const [initialData, setInitialData] = useState(initialData_);
    const [rows, setRows] = useState(initialData);
    const [canSave, setCanSave] = useState(false);
    const [canAddNewRow, setCanAddNewRow] = useState(true);
    const tableId = name + "-table";

    const saveData = (event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setCanSave(false);
        postDataHandler(rows!).then(result => {
            console.log("Updated data:");
            console.log(result);

            setInitialData(rows);
        });
    };

    const createEmptyRow = (event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setRows(prevData => {return [...prevData, ""]});
    };

    const deleteRow = (event : React.MouseEvent<HTMLElement>, indexToDelete: number) => {
        event.preventDefault();

        setRows(prevData => {
            return prevData.filter((_, index) => index !== indexToDelete);
        });
    };

    const handleChange = () => {
        const rows = readTableRows();
        setRows(rows);
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
        if (rows === initialData) {
            setCanSave(false);
            return;
        }
        setCanSave(true);
    }, [initialData, rows]);

    useEffect(() => {
        const emptyRowsCount = rows.filter(row => row === null || row.length === 0).length;
        setCanAddNewRow(emptyRowsCount === 0);
    }, [rows]);

    return (<div className="flex flex-row items-center">
        <div className="flex-1">
            <table id={tableId} className="m-0 table table-borderless bg-white table-rounded">
                <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <th scope="row" className="p-1 m-0">
                            <input
                                disabled={disabled}
                                value={row}
                                type="text"
                                onChange={handleChange}
                                className="text-black w-100 border-0 border-bottom shadow-none"
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
                    <td colSpan={2} className="text-center">
                        <button disabled={disabled || !canAddNewRow} onClick={createEmptyRow} className="w-100 flex justify-center items-center">
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
    </div>);
}
