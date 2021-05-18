import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
function Header() {
  const userSignOut = () => {
    auth.signOut();
  };

  const [{ size, user }, dispatch] = useStateValue();
  console.log(user);
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div className="header_search">
        <input type="text" className="header_seachInput" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to={!user && "login"}>
          <div className="header_option">
            <span className="header_optionLineOne">
              {"Hello " + (user?.displayName || user?.email || "Guest")}
            </span>
            {user ? (
              <span onClick={userSignOut} className="header_optionLineTwo">
                Sign Out
              </span>
            ) : (
              <span className="header_optionLineTwo">Sign In</span>
            )}
          </div>
        </Link>
        <Link to="/orders">
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>
        <Link color="white" to="/checkout">
          <div className="header_basketOption">
            <ShoppingCartOutlinedIcon />
            <span className="header_optionLineTwo header_basketCount">
              {size}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
