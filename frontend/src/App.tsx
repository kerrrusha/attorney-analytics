import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPage from './pages/NoPage';
import Profile from "./pages/Profile";
import {ReactElement, useEffect, useState} from "react";
import {PAGES} from "./common/constants";
import {isLoggedIn} from "./services/isLoggedIn";
import Loading from "./components/loading/Loading";
import Payments from "./pages/Payments";
import Cases from "./pages/Cases";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import Dashboard from "./pages/Dashboard";
import DashboardHire from "./pages/dashboard/DashboardHire";
import DashboardFire from "./pages/dashboard/DashboardFire";
import DashboardAddNewClient from "./pages/dashboard/DashboardAddNewClient";
import DashboardDeclarePayment from "./pages/dashboard/DashboardDeclarePayment";
import DashboardEmployeeBonusSuggestions from "./pages/dashboard/DashboardEmployeeBonusSuggestions";
import DashboardEmployeePromotionSuggestions from "./pages/dashboard/DashboardEmployeePromotionSuggestions";
import DashboardPromoteEmployee from "./pages/dashboard/DashboardPromoteEmployee";
import Employee from "./pages/employee/Employee";

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

  const secure = (element: ReactElement) => loggedIn ? element : <Navigate to={PAGES.login} />;

  const router = <BrowserRouter>
    <Routes>
      <Route path={PAGES.login} element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      <Route path={PAGES.register} element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      <Route index element={secure(<Analytics loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.analytics} element={secure(<Analytics loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.dashboard} element={secure(<Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.payments} element={secure(<Payments loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.employees} element={secure(<Employees loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.clients} element={secure(<Clients loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.cases} element={secure(<Cases loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.profile} element={secure(<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.dashboardHire} element={secure(<DashboardHire loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.dashboardFire} element={secure(<DashboardFire loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.dashboardAddNewClient} element={secure(<DashboardAddNewClient loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.dashboardDeclarePayment} element={secure(<DashboardDeclarePayment loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.dashboardEmployeeBonusSuggestions} element={secure(<DashboardEmployeeBonusSuggestions loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.dashboardEmployeePromotionSuggestions} element={secure(<DashboardEmployeePromotionSuggestions loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.dashboardPromoteEmployee} element={secure(<DashboardPromoteEmployee loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path={PAGES.employees + "/:fullName"} element={secure(<Employee loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>;

  return loggedInFetched ? router : loading;
}
