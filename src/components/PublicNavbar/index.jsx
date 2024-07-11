import { useNavigate, Link } from 'react-router-dom';
import "./style.css";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/home">Wall Of Fame</Link>
      <div className="nav-right">
        <button onClick={redirectToLogin}>Create!</button>
      </div>
    </nav>
  );
};

export default PublicNavbar;
