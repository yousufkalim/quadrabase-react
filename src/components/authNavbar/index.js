import React from "react";
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import Globe from '../../images/globe.svg'
import Button from '../Button'
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LanguageIcon from "@mui/icons-material/Language";
import { teal,common,blueGrey } from "@mui/material/colors";

export default function Navbar(props) {
  const {translate,i18n} = props;
const { language } = i18n;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <nav
      id="header"
      className="flex items-center justify-between flex-nowrap  z-30 top-10 py-1 bg-white shadow-lg border-b  "
    >
      <div className="pl-6 py-3">
        <img
          style={{
            width: "20rem",
            height: "100%",
          }}
          src="https://www.quadrabase.fr/Portals/0/logo.png?ver=I07GQCbk18lVZKQvvBGXyA%3d%3d"
        />
      </div>
      <div>
        <label
          htmlFor="menu-toggle"
          className="cursor-pointer lg:hidden md:block px-3 "
        >
          <svg
            className="fill-current text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>
        <input
          className="hidden"
          type="checkbox"
          id="menu-toggle"
          onClick={() => alert("hello")}
        />
      </div>
      <div className="w-full md:hidden  lg:flex flex items-center  mt-0 px-6 py-1">
        <nav>
          <ul className="md:flex items-center justify-between text-base text-blue-600 pt-4 md:pt-0">
            <li>
              <NavLink
                exact
                className="inline-block no-underline text-gray-400 hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                to="/auth/presentation"
              >
                {translate("Presentation")}
              </NavLink>
            </li>
            <li>
              <a
                className="inline-block no-underline text-gray-400 hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                href="#"
              >
                {translate("Educational Materials")}
              </a>
            </li>
            <li>
              <a
                className="inline-block no-underline text-gray-400 hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                href="#"
              >
                {translate("Documentation")}
              </a>
            </li>
            <li>
              <a
                className="inline-block no-underline text-gray-400 hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                href="#"
              >
                {translate("Manufacturers")}
              </a>
            </li>
            <li>
              <a
                className="inline-block no-underline text-gray-400 hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                href="#"
              >
                {translate("Ordered")}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="md:hidden pt-1 px-1  lg:flex ">
      
        <div className="flex  content-center flex-nowrap shrink-0 
        ">
            {/* <img src={Globe} alt="hello" width={30} /> */}
            <NavLink
          to="/auth/login"
          className="bg-transparent text-purple-400 font-bold px-5 w-full w-3/4 text-center  py-2 rounded-full border border-gray-300 mr-4 hover:bg-purple-400 hover:text-white"
        >
          {translate("Login")}
        </NavLink>
           
          
        <Button
         label={language == "fr" ? "English" : "French"} 
              onClick={() =>
                changeLanguage(`${language == "en" ? "fr" : "en"}`)
              }
              borderColor={blueGrey}
              color="#74bcfc"
              paddingY={true}
             backgroundColor={'transparent'}
              default={false}
              startIcon={
              <IconButton >
                <LanguageIcon style={{color:'#74bcfc'}}/>
              </IconButton>}
            />
        </div>
      </div>
      
    </nav>
  );
}
