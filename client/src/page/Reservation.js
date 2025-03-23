import React, { useEffect, useState } from "react";
import "../styles/Restaurant.css";
import axios from 'axios';

const Menu = () => {
    const [visitorData, setVisitorData] = useState({});
    const [reservationData, setReservationData] = useState({});
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/table');
                setTables(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, []);

    const handleVisitorChanges = (e) => {
        const {name, value} = e.target;
        setVisitorData({
            ...visitorData,
            [name]: value
        });
    }
    const handleReservationChanges = (e) => {
        const {name, value} = e.target;
        setReservationData({
            ...reservationData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // 1. Создаем посетителя и получаем его ID
          const visitor = await axios.post('http://localhost:5000/api/visitor', visitorData);
          const id = visitor.data.id;
      
          // 2. Обновляем состояние reservationData
          setReservationData((prev) => {
            const updatedReservationData = {
              ...prev,
              visitorId: id,
              status: 'INPROCESS',
            };
      
            // 3. Отправляем обновленные данные на сервер
            axios.post('http://localhost:5000/api/reservation', updatedReservationData)
              .then(() => {
                alert('Бронь принята на рассмотрение! Мы вас оповестим');
              })
              .catch((error) => {
                console.error('Ошибка при отправке бронирования:', error);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
              });
      
            return updatedReservationData;
          });
        } catch (error) {
          console.error('Ошибка при создании посетителя:', error);
          alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
        }
      };

    return (
        <div>
            <h1>Забронировать столик</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">ФИО:</label>
                    <input type="text" id="name" name="name" value={visitorData.value} onChange={handleVisitorChanges}></input>
                    <label htmlFor="phone">Номер телефона:</label>
                    <input type="text" id="phone" name="phone" value={visitorData.phone} onChange={handleVisitorChanges}></input>
                    <label htmlFor="sex">Пол:</label>
                    <select id="sex" name="sex" value={visitorData.sex} onChange={handleVisitorChanges}>
                        <option value={"MALE"}>Мужской</option>
                        <option value={"FEMALE"}>Женский</option>
                    </select>
                    <label htmlFor="datetime">Укажите время визита:</label>
                    <input type="datetime-local" id="datetime" name="datetime" value={reservationData.datetime} onChange={handleReservationChanges}></input>
                    <label htmlFor="tableId">Укажите столик:</label>
                    <select id="tableId" name="tableId" value={visitorData.sex} onChange={handleReservationChanges}>
                        {tables.map((table) => {
                            return(<option key={table.id} value={table.id}>
                                Столик №{table.number}, вместимость: {table.capacity}
                            </option>)
                        })}
                    </select>
                    <button type="submit">Зарезервировать</button>
                </div>
            </form>            
        </div>
    );
};

export default Menu;