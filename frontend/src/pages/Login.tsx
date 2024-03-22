import DarkModeSwitch from "../components/DarkModeSwitch";
import {useNavigate} from "react-router-dom";
import React, {FormEvent, useEffect, useState} from "react";
import GoogleLogin from "../components/GoogleLogin";
import {APPLICATION_NAME, PAGES} from "../common/constants";
import {InputTarget, LoggedInProps, LoginRequest} from "../common/commonTypes";
import {onGoogleSignIn} from "../services/onGoogleSignIn";
import goodman from '../resources/img/goodman.png';
import {login} from "../services/login";
import {useTranslation} from "react-i18next";
import LanguageSwitch from "../components/LanguageSwitch";

export default function Login({loggedIn, setLoggedIn} : LoggedInProps) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        if (loggedIn) {
            navigate(PAGES.analytics);
        }
    }, [loggedIn]);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestBody : LoginRequest = {
            login: email,
            password: password,
        }

        login(requestBody).then(response => {
            console.log(`Login status: ${response.status}`);

            if (response.status === 200) {
                setError('');
                setLoggedIn(true);
            } else {
                setError(response.body.message);
            }
        });
    }

    return (
        <div className="background-primary">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={goodman}
                        alt=""
                    />
                    <h4 className="mt-2 text-center display-4 tracking-tight">
                        {APPLICATION_NAME}
                    </h4>
                    <h2 className="mt-16 text-center text-2xl font-bold leading-9 tracking-tight">
                        {t("auth.label")}
                    </h2>
                </div>

                <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6">
                                {t("auth.email")}
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={({target} : InputTarget) => setEmail(target.value)}
                                    className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6">
                                    {t("auth.password")}
                                </label>
                                <div className="text-sm">
                                    <button disabled className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        {t("auth.forgot")}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    required
                                    minLength={3}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={({target} : InputTarget) => setPassword(target.value)}
                                    className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {
                            error && error.length > 0 &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {t("auth.signin")}
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <GoogleLogin onGoogleSignIn={(cred) => onGoogleSignIn(cred, setLoggedIn)} text="Sign in with Google" />
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        {t("auth.notRegistered")}{' '}
                        <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {t("auth.signup")}
                        </a>
                    </p>
                </div>
            </div>
            <DarkModeSwitch />
            <div className="mt-3 flex justify-center">
                <LanguageSwitch />
            </div>
        </div>
    );
}
