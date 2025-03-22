import React, { useState, useEffect } from "react";
import "../styles/Restaurant.css";
import Menu from "./Menu";
import axios from 'axios';
import Reservation from "./Reservation";

const Restaurant = () => {
    const [content, setContent] = useState(<div>sdhfshdfhsdjfkk</div>);
    // const [data, setData] = useState([]);

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
                        <button className="button-aside" id="menu-button" onClick={(e) => {setContent(<Menu></Menu>)}}>Меню</button> 
                        <button className="button-aside" onClick={(e) => {setContent(<Reservation></Reservation>)}}>Забронировать столик</button>  
                    </div>
                    <div className="aside-bottom">
                        <button className="button-aside">Наша команда</button>
                    </div>
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
            <div className="footer">

            </div>
        </div>
    );
};

export default Restaurant;