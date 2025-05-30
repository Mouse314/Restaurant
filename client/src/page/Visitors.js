import React, { useEffect, useState } from "react";
import Visitor from "../components/Visitor";
import Table from "../components/Table";
import DataForm from "../components/DataForm";
import Deletion from "../components/Deletion";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../http/API";
import RestaurantTable from "../components/RestaurantTable";
import Tables from "./Tables";

const objName = 'visitor';

const Visitors = (props) => {
    const [data, setData] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUserForm, setNewUserForm] = useState(null);
    const [deletionMode, setDeletionMode] = useState(null);
    const [visitorData, setVisitorData] = useState({sex: 'FEMALE'});
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedId, setEditedId] = useState(null);

    const handleRowClick = (id) => {
        const fetchData = async () => {
            setSelectedUser(await getOne(objName, id));
        };
        fetchData();
    }

    const handleTableClick = async (id) => {
        const table = await getOne('table', id);

        props.changeContent((<Tables
            table={table}
            changeContent={props.changeContent}>

            </Tables>));
    }

    const handleVisitorChanges = (e) => {
        const {name, value} = e.target;
        setVisitorData({
            ...visitorData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdating) {
            try {
                const response = await updateOne(objName, editedId, visitorData);
                alert('Посетитель успешно обновлён');
                setNewUserForm(null);
                setVisitorData({});
                setIsUpdating(null);
                setEditedId(null);
                return;
            } catch (e) {
                console.error(e);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
            }
        }
        else {
            try {
                const newVisitor = await createOne(objName, visitorData);
                alert('Посетитель успешно добавлен');
                setNewUserForm(null);
            } catch (e) {
                console.error(e);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
            }
        }
    }

    const handleEditClick = async (id) => {
        try {
            const response = await getOne(objName, id);
            setVisitorData(response);
            
            setNewUserForm(true);
            setIsUpdating(true);
            
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }
    
    const handleDeleteClick = async (id) => {
        try {
            await deleteOne(objName, id);
            alert('Посетитель успешно удалён');
            setNewUserForm(null);
            setDeletionMode(null);
            setSelectedUser(null);
            setData(data.filter(el => el.id !== id));
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при удалении данных. Попробуйте в другой раз');
        }
    }

    const handleClose = () => {
        setNewUserForm(null);
        setIsUpdating(null);
        setVisitorData({sex: "FEMALE"});
    }

    useEffect(() => {
        if (props.visitor) setSelectedUser(props.visitor);

        const fetchData = async () => {
            setData(await getAll(objName));
        }
        fetchData();
    }, []);

    return (

        // Список объектов
        <div className="container">
            <h1>Посетители</h1>
            <button className="create-btn" onClick={() => setNewUserForm(true)}>Добавить посетителя</button>
            {data && (<Table columns={[["id", "id"],
                             ["ФИО", "name"],
                             ["телефон", "phone"],
                             ["пол", "sex"]]}
                   data={data}
                   handleRowClick={handleRowClick}
                   />)}

            {/* Подробная инфа об объекте */}
            {selectedUser && (
                <Visitor visitor={selectedUser} 
                         setSelectedUser={setSelectedUser}
                         setEditedId={setEditedId}
                         handleEditClick={handleEditClick}
                         setDeletionMode={setDeletionMode}
                         getVisitor={getOne}
                         handleTableClick={handleTableClick}></Visitor>
            )}


            {/* Обновление / создание нового объекта */}
            {newUserForm && 
                <DataForm title={"посетителя"}
                          onClose={handleClose}
                          handleSubmit={handleSubmit}
                          handleChange={handleVisitorChanges}
                          data={visitorData}
                          columns={[{text: "Введите ФИО: ", type: "text", name: "name"},
                                    {text: "Введите телефон: ", type: "text", name: "phone"},
                                    {text: "Укажите пол: ", type: "select", name:"sex", options: [{value: "MALE", text: "Мужской"}, {value: "FEMALE", text: "Женский"}]}
                          ]}
                          isUpdating={isUpdating}></DataForm>
            }


            {/* Удаление объекта */}
            {deletionMode && (
                <Deletion title="посетителя"
                          onClose={setDeletionMode}
                          obj={deletionMode}
                          handleDeleteClick={handleDeleteClick}
                          setDeletionMode={setDeletionMode}></Deletion>
                
            )}
        </div>
    );
};

export default Visitors;