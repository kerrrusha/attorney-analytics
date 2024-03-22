import Header from '../components/header/Header';
import SaveableInput from "../components/saveable/SaveableInput";
import {LoggedInProps, User, UserUpdateRequest} from "../common/commonTypes";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectUser, setUser} from "../redux/slices/authSlice";
import LoadingGif from "../components/loading/LoadingGif";
import {useAppDispatch} from "../hooks/useAppDispatch";
import Loading from "../components/loading/Loading";
import {fixNull} from "../common/commonUtils";
import SaveableTextArea from "../components/saveable/SaveableTextArea";
import CrudTable from "../components/crud/CrudTable";
import useFetchUser from "../hooks/useFetchUser";
import React, {useState} from "react";
import {API_ENDPOINTS} from "../common/constants";
import {doPostRequestReturnResponse} from "../services/doPostRequestReturnResponse";
import {useTranslation} from "react-i18next";

export default function Profile({loggedIn, setLoggedIn}: LoggedInProps) {
    const [userFetched] = useFetchUser();
    const user: User | null = useAppSelector(selectUser)!;
    const {t} = useTranslation();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const dispatch = useAppDispatch();

    const updateUser = async (requestBody: UserUpdateRequest) => {
        const response = await doPostRequestReturnResponse(requestBody, API_ENDPOINTS.postUpdateUser);
        if (response.status === 200) {
            response.json().then(json => dispatch(setUser(json)));
            setError("");
            setSuccess(true);
            return;
        }
        setSuccess(false);
        response.json().then(json_1 => setError(`Something went wrong: ${json_1.message}`));
        window.scrollTo(0, document.body.scrollHeight);
    }

    const updateFirstName = (newValue: string) => {
        return updateUser({
            userId: user.id,
            firstName: newValue
        });
    };

    const updateLastName = (newValue: string) => {
        return updateUser({
            userId: user.id,
            lastName: newValue
        });
    };

    const updateBio = (newValue: string) => {
        return updateUser({
            userId: user.id,
            bio: newValue
        });
    };

    const updateLinkedin = (newValue: string) => {
        return updateUser({
            userId: user.id,
            linkedinUrl: newValue
        });
    };

    const updateAdmissions = (newData: string[]) => {
        return updateUser({
            userId: user.id,
            admissions: newData
        });
    };

    const updateEmails = (newData: string[]) => {
        return updateUser({
            userId: user.id,
            emails: newData
        });
    };

    const updatePhones = (newData: string[]) => {
        return updateUser({
            userId: user.id,
            phones: newData
        });
    };

    const updateLocations = (newData: string[]) => {
        return updateUser({
            userId: user.id,
            locations: newData
        });
    };

    const updatePracticeAreas = (newData: string[]) => {
        return updateUser({
            userId: user.id,
            practiceAreas: newData
        });
    };

    return user === null ? <Loading/> : (
        <>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <div className="background-primary mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    {!userFetched ? <LoadingGif/> : <form>
                        <div className="space-y-12">
                            <div className="border-b p-2 flex flex-row justify-between align-items-center">
                                <h4 className="text-header font-semibold">{t("profile.name")}</h4>
                                <span className="font-semibold leading-7" id="id">#{user.id}</span>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6">
                                        {t("profile.photo")}
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <img className="rounded-full"
                                             width={128}
                                             src={fixNull(user.profilePhotoUrl)}
                                             alt=""
                                        />
                                        <button
                                            disabled
                                            type="button"
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            <label
                                                htmlFor="file-upload"
                                                className="disabled relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>{t("profile.change")}</span>
                                                <input disabled id="file-upload" name="file-upload" type="file"
                                                       className="sr-only"/>
                                            </label>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pb-12 mt-0">
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <SaveableInput label={t("auth.firstName")} postValueHandler={updateFirstName}
                                                       initialValue_={user.firstName}/>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <SaveableInput label={t("auth.lastName")} postValueHandler={updateLastName}
                                                       initialValue_={user.lastName}/>
                                    </div>

                                    <div className="col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                                            {t("profile.login")}
                                        </label>
                                        <div className="mt-2 flex flex-row items-center">
                                            <input
                                                disabled
                                                readOnly
                                                value={user.login}
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="mr-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                                            {t("profile.roles")}
                                        </label>
                                        <div className="mt-2 flex flex-row items-center">
                                            <ul className="list-group mr-2">
                                                {user.roles.map((item, index) => (
                                                    <li className="list-group-item" key={index}>{item}</li>
                                                ))}
                                            </ul>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="col-span-4">
                                        <label htmlFor="title" className="block text-sm font-medium leading-6">
                                            {t("profile.title")}
                                        </label>
                                        <div className="mt-2 flex flex-row items-center">
                                            <input
                                                disabled
                                                readOnly
                                                value={fixNull(user.title)}
                                                id="title"
                                                name="title"
                                                type="text"
                                                autoComplete="title"
                                                className="mr-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="col-span-4">
                                        <SaveableInput label="Linkedin Url" postValueHandler={updateLinkedin}
                                                       initialValue_={fixNull(user.linkedinUrl)}/>
                                    </div>

                                    <div className="col-span-6">
                                        <SaveableTextArea label={t("profile.bio")} postValueHandler={updateBio}
                                                          initialValue_={fixNull(user.bio)}/>
                                    </div>

                                    <div className="col-span-6">
                                        <span
                                            className="block text-sm font-medium leading-6 mb-2">{t("profile.emails")}</span>
                                        <CrudTable name="emails" initialData_={user.emails}
                                                   postDataHandler={updateEmails}/>
                                    </div>

                                    <div className="col-span-6">
                                        <span
                                            className="block text-sm font-medium leading-6 mb-2">{t("profile.phones")}</span>
                                        <CrudTable name="phones" initialData_={user.phones}
                                                   postDataHandler={updatePhones}/>
                                    </div>

                                    <div className="col-span-6">
                                        <span
                                            className="block text-sm font-medium leading-6 mb-2">{t("profile.locations")}</span>
                                        <CrudTable name="locations" initialData_={user.locations}
                                                   postDataHandler={updateLocations}/>
                                    </div>

                                    <div className="col-span-6">
                                        <span
                                            className="block text-sm font-medium leading-6 mb-2">{t("profile.practiceAreas")}</span>
                                        <CrudTable name="practiceAreas" initialData_={user.practiceAreas}
                                                   postDataHandler={updatePracticeAreas}/>
                                    </div>

                                    <div className="col-span-6">
                                        <span
                                            className="block text-sm font-medium leading-6 mb-2">{t("profile.admissions")}</span>
                                        <CrudTable name="admissions" initialData_={user.admissions}
                                                   postDataHandler={updateAdmissions}/>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                                            {t("auth.password")}
                                        </label>
                                        <div className="mt-2 flex flex-row items-center">
                                            <button
                                                disabled
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                {t("profile.changePassword")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>}
                </div>
                <div className="mt-3">
                    {success && <div className="alert alert-success" role="alert">
                        <span>Profile updated successfully.</span>
                    </div>
                    }
                    {error && <div className="alert alert-danger" role="alert">
                        <span>{error}</span>
                    </div>
                    }
                </div>
            </div>
        </>
    );
}
