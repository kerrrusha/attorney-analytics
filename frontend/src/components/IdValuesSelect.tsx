import React, {useState} from "react";
import {IdValuePair} from "../common/commonTypes";

interface IdValuePairsSelect {
    name: string,
    options: IdValuePair[],
    handleSetId: any;
}

export default function IdValuePairsSelect({name, options, handleSetId}: IdValuePairsSelect) {
    const [id, setId_] = useState<number>(0);

    const setTitleId = (titleId: number) => {
        setId_(titleId);
        handleSetId(titleId);
    };

    return <>
        <select value={id}
                required
                onChange={({target}) => setTitleId(parseInt(target.value))}
                className="text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" selected hidden>Choose {name}</option>
            {options.map((col, index) => <option key={index} value={col.id}>{col.value}</option>)}
        </select>
    </>;
}