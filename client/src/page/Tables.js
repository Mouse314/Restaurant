import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import DataForm from "../components/DataForm";
import Deletion from "../components/Deletion";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../http/API";
import RestaurantTable from "../components/RestaurantTable";
import Visitors from "./Visitors";

const objName = 'table';

const Tables = (props) => {
    const [data, setData] = useState(null);
    const [selectedTable, setSelectedTable] = useState(null);
    const [newTableForm, setNewTableForm] = useState(null);
    const [deletionMode, setDeletionMode] = useState(null);
    const [tableData, setTableData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedId, setEditedId] = useState(null);

    const handleRowClick = (id) => {
        const fetchData = async () => {
            setSelectedTable(await getOne(objName, id));
        };
        fetchData();
    }

    const handleVisitorClick = async (id) => {
        const visitor = await getOne('visitor', id);

        props.changeContent((<Visitors
            visitor={visitor}
            changeContent={props.changeContent}>

            </Visitors>));
    }

    const handleTableChanges = (e) => {
        const {name, value} = e.target;
        setTableData({
            ...tableData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdating) {
            try {
                const response = await updateOne(objName, editedId, tableData);
                alert('Столик успешно обновлён');
                setNewTableForm(null);
                setTableData({});
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
                const newTable = await createOne(objName, tableData);
                alert('Посетитель успешно добавлен');
                setNewTableForm(null);
            } catch (e) {
                console.error(e);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
            }
        }
    }

    const handleEditClick = async (id) => {
        try {
            const response = await getOne(objName, id);
            setTableData(response);
            
            setNewTableForm(true);
            setIsUpdating(true);
            
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }
    
    const handleDeleteClick = async (id) => {
        try {
            await deleteOne(objName, id);
            alert('Столик успешно удалён');
            setNewTableForm(null);
            setDeletionMode(null);
            setSelectedTable(null);
            setData(data.filter(el => el.id !== id));
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при удалении данных. Попробуйте в другой раз');
        }
    }

    const handleClose = () => {
        setNewTableForm(null);
        setIsUpdating(null);
        setTableData({});
    }

    useEffect(() => {
        if (props.table) setSelectedTable(props.table);

        const fetchData = async () => {
            setData(await getAll(objName));
        }
        fetchData();
    }, []);

    return (

        // Список объектов
        <div className="container">
            <h1>Столики</h1>
            <button className="create-btn" onClick={() => setNewTableForm(true)}>Добавить столик</button>
            {data && (<Table columns={[["id", "id"],
                             ["номер", "number"],
                             ["вместимость", "capacity"],
                             ["статус", "status"]]}
                   data={data}
                   handleRowClick={handleRowClick}
                   />)}

            {/* Подробная инфа об объекте */}
            {selectedTable && (
                <RestaurantTable table={selectedTable}
                         setSelectedTable={setSelectedTable} 
                         setEditedId={setEditedId}
                         handleEditClick={handleEditClick}
                         setDeletionMode={setDeletionMode}
                         getTable={getOne}
                         handleVisitorClick={handleVisitorClick}></RestaurantTable>
            )}


            {/* Обновление / создание нового объекта */}
            {newTableForm && 
                <DataForm title={"столик"}
                          onClose={handleClose}
                          handleSubmit={handleSubmit}
                          handleChange={handleTableChanges}
                          data={tableData}
                          columns={[{text: "Введите номер столика: ", type: "number", name: "number"},
                                    {text: "Введите вместимость: ", type: "number", name: "capacity"},
                                    {text: "Укажите статус: ", type: "select", name:"status", options: [{value: "FREE", text: "Свободен"}, {value: "OCCUPIED", text: "Занят"}, {value: "UNAVAIBLE", text: "Недоступен"}]}
                          ]}
                          isUpdating={isUpdating}></DataForm>
            }


            {/* Удаление объекта */}
            {deletionMode && (
                <Deletion title="столик"
                          onClose={setDeletionMode}
                          obj={deletionMode}
                          handleDeleteClick={handleDeleteClick}
                          setDeletionMode={setDeletionMode}></Deletion>
                
            )}

        </div>
    );
};

export default Tables;