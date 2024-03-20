import React, {useState} from "react";
import useFetchTitles from "../hooks/useFetchTitles";

interface TitleSelectProps {
    handleSetTitleId: any;
}

export default function TitleSelect({handleSetTitleId}: TitleSelectProps) {
    const [titles] = useFetchTitles()!;
    const [titleId, setTitleId_] = useState<number>(0);

    const setTitleId = (titleId: number) => {
        setTitleId_(titleId);
        handleSetTitleId(titleId);
    };

    return <>
        <select value={titleId}
                required
                onChange={({target}) => setTitleId(parseInt(target.value))}
                className="text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value={0}>Choose title</option>
            {titles && titles.map((col, index) => <option key={index} value={col.id}>{col.name}</option>)}
        </select>
    </>;
}