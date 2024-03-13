import Header from '../components/Header';
import {LoggedInProps} from "../common/commonTypes";

export default function Home({loggedIn, setLoggedIn} : LoggedInProps) {
    return (
      <div className="home">
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      </div>
    );
}
