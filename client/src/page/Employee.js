import React, { useEffect, useState } from "react";
import "../styles/Restaurant.css";
import axios from 'axios';

const Employee = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:5000/api/employee');
              setData(response.data);
            } catch (error) {
              console.error('Ошибка при получении данных:', error);
            }
          };
          fetchData();
    }, []);

    return (
        <div>
            <h1>НАША КОМАНДА</h1>
            <div className="info">
                {data.map((el, ind) => {
                    return(<div className="block" key={ind}>
                        <img src="7830d918-3dca-4b8f-817e-92aacfd44bb0.jpg" alt="picture"></img>
                        <h2>{el.name}</h2>
                        <p>{el.position}</p>
                    </div>)
                })}
            </div>
        </div>
    );
};

export default Employee;