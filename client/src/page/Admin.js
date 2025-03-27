import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visitors from "./Visitors";
import Tables from "./Tables";
import Orders from "./Orders";

const Admin = () => {
    const navigate = useNavigate();

    const [content, setContent] = useState([]);

    const changeContent = async (content) => {
        setContent(content);
    }

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
                        <button className="button-aside" onClick={() => {setContent(<Visitors changeContent={changeContent}></Visitors>)}}>Посетители</button>  
                        <button className="button-aside" onClick={() => {setContent(<Tables changeContent={changeContent}></Tables>)}}>Столики</button>  

                        <button className="button-aside" onClick={() => {setContent(<Orders changeContent={changeContent}></Orders>)}}>Заказы</button> 
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