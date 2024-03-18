import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPage from './pages/NoPage';
import Profile from "./pages/Profile";
import {useEffect, useState} from "react";
import {PAGES} from "./common/constants";
import {isLoggedIn} from "./services/isLoggedIn";
import Loading from "./components/loading/Loading";
import Payments from "./pages/Payments";
import Cases from "./pages/Cases";
import Clients from "./pages/Clients";
import Workers from "./pages/Workers";

export default function App() {
  const [loggedIn, setLoggedIn] = useState<any>(undefined);
  const [loggedInFetched, setLoggedInFetched] = useState<boolean>(false);

  useEffect(() => {
    if (loggedInFetched) {
      return;
    }

    const initLogin = async () => {
      setLoggedIn(await isLoggedIn());
      setLoggedInFetched(true);
    };
    initLogin();
  }, []);

  const loading = <Loading />;

  const router = <BrowserRouter>
    <Routes>
      <Route index
             element={loggedIn ? <Analytics loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to={PAGES.login} />} />
      <Route path={PAGES.analytics}
             element={loggedIn ? <Analytics loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to={PAGES.login} />} />
      <Route path={PAGES.payments}
             element={loggedIn ? <Payments loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to={PAGES.login} />} />
      <Route path={PAGES.workers}
             element={loggedIn ? <Workers loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to={PAGES.login} />} />
      <Route path={PAGES.clients}
             element={loggedIn ? <Clients loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to={PAGES.login} />} />
      <Route path={PAGES.cases}
             element={loggedIn ? <Cases loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to={PAGES.login} />} />
      <Route path={PAGES.profile}
             element={loggedIn ? <Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to={PAGES.login} />} />
      <Route path={PAGES.login} element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      <Route path={PAGES.register} element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>;

  return loggedInFetched ? router : loading;
}
