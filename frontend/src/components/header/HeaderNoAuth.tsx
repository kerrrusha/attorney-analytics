import React from 'react'
import { Disclosure } from '@headlessui/react'
import DarkModeSwitch from "../DarkModeSwitch";
import {APPLICATION_NAME, PAGES} from "../../common/constants";
import goodman from "../../resources/img/goodman.png";

export default function HeaderNoAuth() {
    return (
        <Disclosure as="nav" className="background-secondary">
            {() => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <a className="flex justify-start no-underline px-3" href={PAGES.analytics}>
                                <div className="flex items-center">
                                    <img
                                        className="h-10 w-auto"
                                        src={goodman}
                                        alt={APPLICATION_NAME}
                                    />
                                    <h3 className="font-bold font-sans site-name mb-0">{APPLICATION_NAME}</h3>
                                </div>
                            </a>
                            <div className="flex flex-1 absolute inset-y-0 right-0 justify-end items-center sm:static sm:inset-auto sm:ml-6">
                                <DarkModeSwitch />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
}
