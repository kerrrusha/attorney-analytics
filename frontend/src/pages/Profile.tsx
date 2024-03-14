import Header from '../components/header/Header';
import SaveableInput from "../components/saveable/SaveableInput";
import {LoggedInProps, UserFull, UserUpdateRequest} from "../common/commonTypes";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectUserFull, setUser} from "../redux/slices/authSlice";
import LoadingGif from "../components/loading/LoadingGif";
import {postUpdateUser} from "../services/postUpdateUser";
import {useAppDispatch} from "../hooks/useAppDispatch";
import Loading from "../components/loading/Loading";
import useFetchUserFull from "../hooks/useFetchUserFull";
import {fixNull} from "../common/commonUtils";
import SaveableTextArea from "../components/saveable/SaveableTextArea";
import CrudTable, {TableData} from "../components/CrudTable";

export default function Profile({loggedIn, setLoggedIn} : LoggedInProps) {
    const [userFetched] = useFetchUserFull();
    const user : UserFull | null = useAppSelector(selectUserFull)!;
    const dispatch = useAppDispatch();

    const updateUser = (requestBody : UserUpdateRequest) => {
        return postUpdateUser(requestBody).then(updatedUser => {
            console.log("Updated user:");
            console.log(updatedUser);

            dispatch(setUser(updatedUser));
        });
    }

    const updateFirstName = (newValue : string) => {
        return updateUser({
            userId: user.id,
            firstName: newValue
        });
    };

    const updateLastName = (newValue : string) => {
        return updateUser({
            userId: user.id,
            lastName: newValue
        });
    };

    const updateBio = (newValue : string) => {
        return updateUser({
            userId: user.id,
            bio: newValue
        });
    };

    const updateLinkedin = (newValue : string) => {
        return updateUser({
            userId: user.id,
            linkedinUrl: newValue
        });
    };

    const updateAdmissions = (newData : TableData) => {
        return updateUser({
            userId: user.id,
            admissions: newData.rows
        });
    };

    const updateEmails = (newData : TableData) => {
        return updateUser({
            userId: user.id,
            emails: newData.rows
        });
    };

    const updatePhones = (newData : TableData) => {
        return updateUser({
            userId: user.id,
            phones: newData.rows
        });
    };

    const updateLocations = (newData : TableData) => {
        return updateUser({
            userId: user.id,
            locations: newData.rows
        });
    };

    const updatePracticeAreas = (newData : TableData) => {
        return updateUser({
            userId: user.id,
            practiceAreas: newData.rows
        });
    };

    return user === null ? <Loading /> : (
        <>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <div className="background-primary mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    {!userFetched ? <LoadingGif /> : <form>
                        <div className="space-y-12">
                            <div className="border-b p-2 flex flex-row justify-between align-items-center">
                                <h4 className="text-header font-semibold">Profile</h4>
                                <span className="font-semibold leading-7" id="id">#{user.id}</span>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6">
                                        Photo
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
                                                <span>Change</span>
                                                <input disabled id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pb-12 mt-0">
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <SaveableInput label="First name" postValueHandler={updateFirstName}
                                                       initialValue_={user.firstName} disabled={true} />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <SaveableInput label="Last name" postValueHandler={updateLastName}
                                                       initialValue_={user.lastName} disabled={true} />
                                    </div>

                                    <div className="col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                                            Login
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
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                                            Roles
                                        </label>
                                        <div className="mt-2 flex flex-row items-center">
                                            <ul className="list-group mr-2">
                                                {user.roles.map((item, index) => (
                                                    <li className="list-group-item" key={index}>{item}</li>
                                                ))}
                                            </ul>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="col-span-4">
                                        <label htmlFor="title" className="block text-sm font-medium leading-6">
                                            Title
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
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="col-span-4">
                                        <SaveableInput label="Linkedin Url" postValueHandler={updateLinkedin}
                                                       initialValue_={fixNull(user.linkedinUrl)} disabled={true} />
                                    </div>

                                    <div className="col-span-6">
                                        <SaveableTextArea label="Biography" postValueHandler={updateBio}
                                                       initialValue_={fixNull(user.bio)} disabled={true} />
                                    </div>

                                    <div className="col-span-6">
                                        <span className="block text-sm font-medium leading-6 mb-2">Emails</span>
                                        <CrudTable initialData_={{rows: user.emails}} postDataHandler={updateEmails} />
                                    </div>

                                    <div className="col-span-6">
                                        <span className="block text-sm font-medium leading-6 mb-2">Phones</span>
                                        <CrudTable initialData_={{rows: user.phones}} postDataHandler={updatePhones} />
                                    </div>

                                    <div className="col-span-6">
                                        <span className="block text-sm font-medium leading-6 mb-2">Locations</span>
                                        <CrudTable initialData_={{rows: user.admissions}} postDataHandler={updateLocations} />
                                    </div>

                                    <div className="col-span-6">
                                        <span className="block text-sm font-medium leading-6 mb-2">Practice Areas</span>
                                        <CrudTable initialData_={{rows: user.admissions}} postDataHandler={updatePracticeAreas} />
                                    </div>

                                    <div className="col-span-6">
                                        <span className="block text-sm font-medium leading-6 mb-2">Admissions</span>
                                        <CrudTable initialData_={{rows: user.admissions}} postDataHandler={updateAdmissions} />
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                                            Password
                                        </label>
                                        <div className="mt-2 flex flex-row items-center">
                                            <button
                                                disabled
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                Change password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>}
                </div>
            </div>
        </>
    );
}
