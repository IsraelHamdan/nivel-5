import { Link } from "react-router-dom";
import { AiFillGithub, AiOutlineCopyrightCircle } from "react-icons/ai";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <h4 className="h4 footer-title">Israel Hamdan</h4>
      <nav className="navbar footer-navbar">
        <Link
          to="https://github.com/IsraelHamdan"
          className="navbar-link d-flex footer-navbar_link align-content-baseline">
          <AiOutlineCopyrightCircle className="mr-3" size={13} />
          <div className="mr-3">
            <AiFillGithub size={25} />
          </div>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
