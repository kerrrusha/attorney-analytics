import Header from '../components/header/Header';
import {LoggedInProps} from "../common/commonTypes";
import Sidebar from "../components/sidebar/Sidebar";

export default function Dashboard({loggedIn, setLoggedIn} : LoggedInProps) {
    return (
      <div className="home">
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Sidebar />
      </div>
    );
}
