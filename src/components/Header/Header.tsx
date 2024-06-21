import "./Header.css";
import React from "react";
import Logo from "../../images/logo.svg";
import LogoMobile from "../../images/logo-mobile.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <button className="header__burger-menu" type="button" />
      <img className="header__logo-mobile" src={LogoMobile} alt="Логотип WB" />
      <img className="header__logo" src={Logo} alt="Логотип WB" />
      <nav className="header__nav-menu">
        <button className="active">Поставки</button>
        <button>Товары</button>
        <button>Цены и скидки</button>
        <button>Аналитика</button>
        <button>Реклама</button>
      </nav>
      <div className="header__buttons-block">
        <button className="header__history-button" type="button" />
        <button className="header__doc-button" type="button" />
      </div>
    </header>
  );
};

export default Header;
