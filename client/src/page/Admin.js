import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import Visitors from "./Visitors";
import Tables from "./Tables";
import Orders from "./Orders";
import Reservations from "./Reservations";
import Employes from "./Employes";
import MenuItems from "./MenuItems";
import Inventory from "./Inventory";

const Admin = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [content, setContent] = useState([]);

    const changeContent = async (content) => {
        setContent(content);
    }

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navigate('/'); // Перенаправляем на главную после выхода
        } else {
            alert(result.message || 'Ошибка при выходе');
        }
    };

    return (
        <div className="Component">
            <div className="header">
                <div className="title">РЕСТОРАН админ-панель</div>
                <div className="right-block">
                    <button className="button-top" onClick={() => {navigate('/')}}>Назад</button>
                    <button className="button-top" onClick={handleLogout}>Выйти</button>
                </div>
            </div>
            <div className="main">
                <div className="aside">
                    <div className="aside-top">
                        <button className="button-aside" onClick={() => {setContent(<Visitors changeContent={changeContent}></Visitors>)}}>Посетители</button>  
                        <button className="button-aside" onClick={() => {setContent(<Tables changeContent={changeContent}></Tables>)}}>Столики</button>  

                        <button className="button-aside" onClick={() => {setContent(<Orders changeContent={changeContent}></Orders>)}}>Заказы</button> 
                        <button className="button-aside" onClick={() => {setContent(<Reservations changeContent={changeContent}></Reservations>)}}>Бронирование</button> 

                        <button className="button-aside" onClick={() => {setContent(<MenuItems changeContent={changeContent}></MenuItems>)}}>Меню</button> 
                        <button className="button-aside" onClick={() => {setContent(<Inventory changeContent={changeContent}></Inventory>)}}>Склад</button> 

                        <button className="button-aside" onClick={() => {setContent(<Employes changeContent={changeContent}></Employes>)}}>Сотрудники</button> 
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