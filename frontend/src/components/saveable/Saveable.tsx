import React, {ReactElement, useEffect, useState} from "react";
import {InputTarget} from "../../common/commonTypes";
import {MIN_VALUE_LENGTH} from "../../common/constants";
import {toKebabCase} from "../../common/commonUtils";

type SaveableProp = {
    inputElement: ReactElement,
    label: string;
    postValueHandler: (value: string) => Promise<any>;
    validate : boolean;
    disabled : boolean;
    initialValue_? : string;
}

export default function Saveable({inputElement, label, postValueHandler, disabled, validate, initialValue_} : SaveableProp) {
    const [initialValue, setInitialValue] = useState(initialValue_);
    const [value, setValue] = useState(initialValue);
    const [buttonIsActive, setButtonIsActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = ({target} : InputTarget) => {
        setValue(target.value);
    };

    const saveValue = (event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (validate) {
            const errorMessage = validateValue();
            if (errorMessage) {
                setErrorMessage(errorMessage);
                return;
            }
        }
        setErrorMessage('');

        postValueHandler(value!).then(result => {
            console.log("Updated value:");
            console.log(result);

            setInitialValue(value);
            setButtonIsActive(false);
        });
    };

    function validateValue() : string | null {
        const valid = value !== undefined && value !== null && value.length >= MIN_VALUE_LENGTH;
        return valid ? null : `Value must be at least ${MIN_VALUE_LENGTH} symbols length`;
    }

    useEffect(() => {
        if (value === initialValue) {
            setButtonIsActive(false);
            return;
        }
        setButtonIsActive(true);
    }, [initialValue, value]);

    const kebabCased = toKebabCase(label);
    const readyInputElement = React.cloneElement(inputElement,
        { name: kebabCased, id: kebabCased, value: value, onChange: handleChange });

    return (
        <>
            <label htmlFor={kebabCased} className="block text-sm font-medium leading-6">
                {label}
            </label>
            <div className="mt-2 flex flex-row items-center">
                {readyInputElement}
                <button disabled={disabled || !buttonIsActive} onClick={saveValue}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </button>
            </div>
            {errorMessage && <div className="p-1 text-sm text-red-800 rounded-lg" role="alert">
                {errorMessage}
            </div>}
        </>
    );
}