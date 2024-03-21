import Saveable from "./Saveable";

type SaveableInputProp = {
    label: string;
    postValueHandler: (value: string) => Promise<any>;
    initialValue_? : string;
    disabled? : boolean;
    validate? : boolean;
}

export default function SaveableInput({label, postValueHandler, initialValue_, disabled=false, validate=false} : SaveableInputProp) {
    return (<Saveable label={label} postValueHandler={postValueHandler} initialValue_={initialValue_} disabled={disabled}
                     validate={validate} inputElement={
        <input
            type="text"
            className="text-black block mr-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
    } />);
}
