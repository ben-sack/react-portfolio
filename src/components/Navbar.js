import { transform } from "framer-motion";
import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";



const ICON_SIZE = 28;

const Icon = ({ onClick, children }) => (
  <svg onClick={onClick} viewBox="0 0 24 24" fill="currentColor" height={ICON_SIZE} width={ICON_SIZE}>
    {children}
  </svg>
);

const HomeIcon = ({ onClick }) => (
  <Icon>
    {/* <path d="M12.71 2.29a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42A1 1 0 003 13h1v7a2 2 0 002 2h12a2 2 0 002-2v-7h1a1 1 0 001-1 1 1 0 00-.29-.71zM6 20v-9.59l6-6 6 6V20z" /> */}
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"><path opacity="0.25" d="M20 18.8V6.63998L13.6514 2.81501L13.6514 2.815C13.0511 2.45333 12.751 2.2725 12.4304 2.20186C12.1469 2.13938 11.8531 2.13938 11.5696 2.20186C11.249 2.2725 10.9489 2.45334 10.3486 2.81501L4 6.64001V18.8C4 19.9201 4 20.4802 4.21799 20.908C4.40973 21.2843 4.71569 21.5903 5.09202 21.782C5.51984 22 6.0799 22 7.2 22H16.8C17.9201 22 18.4802 22 18.908 21.782C19.2843 21.5903 19.5903 21.2843 19.782 20.908C20 20.4802 20 19.9201 20 18.8Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M1.14251 9.5145C1.42665 9.98808 2.04091 10.1416 2.51449 9.85749L12 4.16619L21.4855 9.85749C21.9591 10.1416 22.5733 9.98808 22.8575 9.5145C23.1416 9.04092 22.9881 8.42666 22.5145 8.14251L13.029 2.45121C12.3956 2.07119 11.6044 2.07119 10.971 2.45121L1.4855 8.14251C1.01192 8.42666 0.858357 9.04092 1.14251 9.5145Z" fill="currentColor"></path><path d="M9 16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16V22H9V16Z" fill="currentColor"></path></svg>
  </Icon>
);
const ShopIcon = () => (
  <Icon>
    {/* <path fill="currentColor" fillRule="evenodd" d="M17 7a3 3 0 00-3-3h-4a3 3 0 00-3 3H6a3 3 0 00-3 3v8a3 3 0 003 3h12a3 3 0 003-3v-8a3 3 0 00-3-3h-1zm-3-1h-4a1 1 0 00-1 1h6a1 1 0 00-1-1zM6 9h12a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8a1 1 0 011-1z" clipRule="evenodd"/> */}
    {/* <path fill="currentColor" fillRule="evenodd" d="M12 2a5 5 0 00-5 5v1H6v4h2v5a3 3 0 003 3h6a3 3 0 003-3v-5h2V8h-1V7a5 5 0 00-5-5zm1 9a3 3 0 100-6 3 3 0 000 6zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/> */}
    <path d="M20 5h-2.586l-.707-.707C16.105 3.492 15.552 3 15 3h-6c-.552 0-1.105.492-1.707 1.293L6.586 5H4c-1.104 0-2 .897-2 2v12c0 1.103.896 2 2 2h16c1.104 0 2-.897 2-2V7c0-1.103-.896-2-2-2zm-8 13c-2.71 0-4.9-2.192-4.9-4.9S9.29 8.2 12 8.2 16.9 10.392 16.9 13.1 14.71 18 12 18zm5.3-7.9c-.625 0-1.131-.506-1.131-1.131s.506-1.131 1.131-1.131 1.131.506 1.13 1.131-.506 1.131-1.131 1.131z" />

  </Icon>
);



const GitIcon = () => (
  <Icon>
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path>
  </Icon>
);

const PaintIcon = () => (
  <Icon>
<path d="M9.65999 21.137C8.73999 22.379 7.22199 22.678 6.11799 22.701C4.80699 22.747 3.67999 22.425 3.12799 22.195C4.55399 21.597 5.08299 20.723 5.63499 19.803C5.93399 19.297 6.23299 18.791 6.71599 18.285C7.08399 17.894 7.58999 17.664 8.14199 17.664C8.69399 17.641 9.19999 17.848 9.59099 18.216C10.511 19.067 10.258 20.332 9.65999 21.137Z"/>
<path d="M19.412 1.70201L10.534 18.147C10.419 17.986 10.304 17.825 10.143 17.687C9.61399 17.181 8.92399 16.905 8.18799 16.928L18.17 0.989007C18.354 0.667007 18.768 0.552007 19.113 0.736007L19.182 0.782007C19.481 0.966007 19.596 1.38001 19.412 1.70201Z"/>
  </Icon>
)

const ContactIcon = () => (
  <Icon>
    <path
      opacity="0.25"
      d="M1 6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V6Z"
      fill="currentColor"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.23177 7.35981C5.58534 6.93553 6.2159 6.87821 6.64018 7.23177L11.3598 11.1648C11.7307 11.4738 12.2693 11.4738 12.6402 11.1648L17.3598 7.23177C17.7841 6.87821 18.4147 6.93553 18.7682 7.35981C19.1218 7.78409 19.0645 8.41465 18.6402 8.76822L13.9205 12.7012C12.808 13.6284 11.192 13.6284 10.0794 12.7012L5.35981 8.76822C4.93553 8.41465 4.87821 7.78409 5.23177 7.35981Z"
      fill="currentColor"
    ></path>
  </Icon>
);

function Navbar({ isDarkMode }) {
  const [scaleFactors, setScaleFactors] = useState([]);
  const dockRef = useRef(null);
  // eslint-disable-next-line
  const [dockScale, setDockScale] = useState(1);
  const isMobile = window.innerWidth <= 768;


  const handleMouseMove = (event) => {
    if (window.innerWidth <= 768) {
      return;
    }
    if (!dockRef.current) return;

    const dockRect = dockRef.current.getBoundingClientRect();
    const dockCenterX = dockRect.left + dockRect.width / 2;

    const distanceFromCenter = Math.abs(dockCenterX - event.clientX);
    const dockScaleFactor =
      distanceFromCenter > dockRect.width / 2
        ? 1
        : 1 +
          (0.1 * (dockRect.width / 2 - distanceFromCenter)) /
            (dockRect.width / 2);

    setDockScale(dockScaleFactor);

    const dockItems = dockRef.current.children;
    const newScaleFactors = [];

    for (let item of dockItems) {
      const itemRect = item.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2;

      const distance = Math.abs(itemCenterX - event.clientX);

      // Define the "strength" of the effect.
      const scaleFactor =
        distance > 100 ? 1 : 1 + (0.2 * (100 - distance)) / 100;

      newScaleFactors.push(scaleFactor);
    }

    setScaleFactors(newScaleFactors);
  };
  const handleMouseLeave = () => {
    // Reset the scale factors
    const resetScales = Array(dockRef.current.children.length).fill(1);
    setScaleFactors(resetScales);
  };
  const icons = [
    { component: <HomeIcon />, path: "/" },
    { component: <ShopIcon />, path: "/images" },
    // { component: <PaintIcon />, path: "/[paint" },
    { component: <GitIcon />, path: "https://github.com/ben-sack" },
    { component: <ContactIcon />, path: "mailto:contact@bensack.io" },
  ];

  return (
    <div
      className={`navbar ${isDarkMode ? "dark" : ""} ${
        isMobile ? "" : "floating"
      }`}
    >
      <div
        className="dock"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={dockRef}
      >
        {icons.map((icon, index) => (
          <NavLink
            key={index}
            to={icon.path}
            className={`dock-item ${window.location.pathname === icon.path ? 'active-dock-item' : ''}`}
            style={{ transform: `scale(${scaleFactors[index] || 1})` }}
          >
            {icon.component}
          </NavLink>

        ))}
      </div>
    </div>
  );
}

export default Navbar;
