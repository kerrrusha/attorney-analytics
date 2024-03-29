import React, {ErrorInfo} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './resources/css/tailwind.css';
import './resources/css/bootstrap.css';
import './resources/css/index.css';
import './resources/css/App.css';
import './resources/css/stat.css';
import store from "./redux/store";
import {Provider} from "react-redux";
import {ErrorBoundary} from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage";
import './multilang/i18n';

function handleError(error: Error, info: ErrorInfo) {
    console.error("Caught an error:", error, info);
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorPage} onError={handleError}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);
