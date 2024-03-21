import React from "react";

export default function SubPageHeader({header}:  {header: string}) {
    return <div className="border-b p-2 flex flex-row justify-between align-items-center">
        <h4 className="text-header font-semibold">{header}</h4>
    </div>;
}