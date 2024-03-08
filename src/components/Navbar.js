import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import cart from "../images/cart.svg";
import hamburger_icon from "../images/hamburger.svg";
import cross_icon from "../images/cross.svg";
import { useSelector } from "react-redux";
import "../../src/App.css";
import { useState } from "react";

function Navbar() {
  const getdata = useSelector((state) => state.addcartReducer.carts);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className="navbar fixed-top ">
        <div className="container">
          <button className="btn cart" type="submit" onClick={toggleMenu}>
            <img
              src={isMenuOpen ? cross_icon : hamburger_icon}
              alt="hamrburger_icon"
            ></img>
          </button>
          {/* Slide-in menu */}
          <div
            className={`menu-container ${isMenuOpen ? "open" : ""}`}
            style={{
              position: "fixed",
              top: 65,
              left: isMenuOpen ? 0 : "-300px",
              width: "250px",
              height: "100%",
              backgroundColor: "#333",
              paddingTop: "50px",
              transition: "left 0.3s ease",
            }}
          >
            <ul className="list-unstyled text-center">
              <li
                className="py-2 text-white"
                onClick={() => setMenuOpen(false)}
              >
                Place the order
              </li>
              <li
                className="py-2 text-white"
                onClick={() => setMenuOpen(false)}
              >
                View & Pay Bill
              </li>
              <li
                className="py-2 text-white"
                onClick={() => setMenuOpen(false)}
              >
                Offers
              </li>
              <li
                className="py-2 text-white"
                onClick={() => setMenuOpen(false)}
              >
                Contact Now
              </li>
            </ul>
          </div>
          <Link to={"/"} className="navbar-brand">
            {" "}
            <img src={logo} alt="logo"></img>
          </Link>
          <Link to={"/checkout"}>
            <button className="btn cart" type="submit">
              <img src={cart} alt="cart"></img> <sapn>{getdata.length}</sapn>
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
