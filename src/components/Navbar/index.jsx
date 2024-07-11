import LoginButton from "../LoginButton";
import Profile from "../Profile";
import "./style.css";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton";

const Navbar = ({handlePublish}) => {
  return (
    <nav>
      <Link to="/home">Wall Of Fame</Link>
      <div className="nav-right">
        <LogoutButton />
        <Profile />
        <LoginButton />
        <button onClick={handlePublish}>Publish</button>
      </div>
    </nav>
  );
};

export default Navbar;
