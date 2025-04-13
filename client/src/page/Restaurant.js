import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../components/AuthContext.js";
import "../styles/Restaurant.css";
import Menu from "./Menu";
import axios from 'axios';
import Reservation from "./Reservation";
import Employee from "./Employee";

const Restaurant = () => {
    const navigate = useNavigate();

    const [content, setContent] = useState(<div>sdhfshdfhsdjfkk</div>);

    const { isAuthenticated, login } = useAuth();

    const handleAdminClick = async () => {
        if (isAuthenticated) {
            navigate('/admin');
        } else {
            const password = prompt('Введите пароль для доступа к админ-панели:');
            console.log(password);
            if (password) {
                const result = await login(password);
                if (result.success) {
                    navigate('/admin');
                } else {
                    alert(result.message || 'Ошибка авторизации');
                }
          }
        }
      };

    return (
        <div className="Component">
            <div className="header">
                <div className="title">РЕСТОРАН</div>
                <div className="right-block">
                    <button className="button-top">Кнопка 1</button>
                    <button className="button-top">Кнопка 2</button>
                    <button className="button-top" onClick={handleAdminClick}>Админ - панель</button>
                </div>
            </div>
            <div className="main">
                <div className="aside">
                    <div className="aside-top">
                        <button className="button-aside" id="menu-button" onClick={(e) => {setContent(<Menu></Menu>)}}>Меню</button> 
                        <button className="button-aside" onClick={(e) => {setContent(<Reservation></Reservation>)}}>Забронировать столик</button>  
                    </div>
                    <div className="aside-bottom">
                        <button className="button-aside" onClick={(e) => {setContent(<Employee></Employee>)}}>Наша команда</button>
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