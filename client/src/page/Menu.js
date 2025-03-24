import React, { useEffect, useState } from "react";
import "../styles/Restaurant.css";
import axios from 'axios';

const Menu = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(1111);
              const response = await axios.get('http://localhost:5000/api/menuitem');
              setData(response.data);
              console.log(response.data);
            } catch (error) {
              console.error('Ошибка при получении данных:', error);
            }
          };
          fetchData();
    }, []);

    return (
        <div>
            <h1>МЕНЮ</h1>
            <div className="info">
                {data.map((el, ind) => {
                    console.log(el.category);
                    return(<div className="block" key={ind}>
                        <img src="7830d918-3dca-4b8f-817e-92aacfd44bb0.jpg" alt="picture"></img>
                        <h2>{el.name}</h2>
                        <p>{el.description}</p>
                        <p><i>{el.category}</i></p>
                        <h2>{el.price}</h2>
                    </div>)
                })}
            </div>
        </div>
    );
};

export default Menu;