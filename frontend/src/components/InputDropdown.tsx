import {SelectOption} from "../common/commonTypes";
import React, {useEffect, useState} from "react";

interface InputDropdownProps {
    options: Array<SelectOption>,
    handleChange: any,
    handleSelect: any,
}

export default function InputDropdown({options, handleChange, handleSelect}: InputDropdownProps) {
    const [selectedOptionValue, setSelectedOptionValue_] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [inputFocused, setInputFocused] = useState(false);

    const width = "25rem";

    const handleOptionSelect = (option: SelectOption) => {
        setInputValue(option.label);
        setSelectedOptionValue(option.value);
    }

    const handleInputChange = ({target}: any) => {
        setInputValue(target.value);
        handleChange(target.value);
    }

    const setSelectedOptionValue = (selectedOptionValue_: string) => {
        setSelectedOptionValue_(selectedOptionValue_);
        handleSelect(selectedOptionValue_);
    }

    useEffect(() => {
        let currentOption = options.filter(option => option.value === selectedOptionValue)[0];
        if (currentOption) {
            if (inputValue !== currentOption.label) {
                setSelectedOptionValue("");
            }
        } else {
            currentOption = options.filter(option => option.label === inputValue)[0];
            if (currentOption) {
                if (inputValue === currentOption.label) {
                    setSelectedOptionValue(currentOption.value);
                }
            }
        }
    }, [inputValue]);

    return <div onFocus={() => setInputFocused(true)}>
        <input className="text-black" style={{width: width}} onChange={handleInputChange} value={inputValue} />
        <div onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)}
             className="mt-2 text-black bg-white rounded outline-none flex flex-col position-absolute"
             style={{width: width, zIndex: 10}}>
            {inputFocused && options.map((option, index) =>
                    <button key={index} onClick={() => handleOptionSelect(option)} value={option.value}
                            className={(option.value === selectedOptionValue ? "bg-indigo-400" : "") +
                                " rounded hover:bg-indigo-200 text-start px-3 py-2"}>
                        {option.label}
                    </button>)}
        </div>
    </div>;
}