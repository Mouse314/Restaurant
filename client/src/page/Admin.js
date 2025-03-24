import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visitors from "./Visitors";

const Admin = () => {
    const navigate = useNavigate();

    const [content, setContent] = useState([]);

    return (
        <div className="Component">
            <div className="header">
                <div className="title">РЕСТОРАН админ-панель</div>
                <div className="right-block">
                    <button className="button-top" onClick={() => {navigate('/')}}>Назад</button>
                </div>
            </div>
            <div className="main">
                <div className="aside">
                    <div className="aside-top">
                        <button className="button-aside" onClick={() => {setContent(<Visitors></Visitors>)}}>Посетители</button>  
                        <button className="button-aside">Столики</button>  

                        <button className="button-aside">Заказы</button> 
                        <button className="button-aside">Бронирование</button> 

                        <button className="button-aside">Меню</button> 
                        <button className="button-aside">Склад</button> 

                        <button className="button-aside">Оплата</button> 
                        <button className="button-aside">Сотрудники</button> 
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

export default Admin;