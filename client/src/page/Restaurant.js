import React from "react";
import "../styles/Restaurant.css";

const Restaurant = () => {
    return (
        <div className="Component">
            <div className="header">
                <div className="title">РЕСТОРАН</div>
                <div className="right-block">
                    <button className="button-top">Кнопка 1</button>
                    <button className="button-top">Кнопка 2</button>
                    <button className="button-top">Кнопка 3</button>
                </div>
            </div>
            <div className="main">
                <div className="aside">
                    <div className="aside-top">
                        <button className="button-aside" id="menu-button">Меню</button>
                        <button className="button-aside">Забронировать столик</button>  
                    </div>
                    <div className="aside-bottom">
                        <button className="button-aside">Наша команда</button>
                    </div>
                </div>
                <div className="content">

                </div>
            </div>
            <div className="footer">

            </div>
        </div>
    );
};

export default Restaurant;