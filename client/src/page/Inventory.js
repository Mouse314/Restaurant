import React, { useEffect, useState } from "react";
import Visitor from "../components/Visitor";
import Table from "../components/Table";
import DataForm from "../components/DataForm";
import Deletion from "../components/Deletion";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../http/API";
import RestaurantTable from "../components/RestaurantTable";
import Tables from "./Tables";
import InventoryItem from "../components/InventoryItem";

const objName = 'inventory';

const Inventory = (props) => {
    const [data, setData] = useState(null);
    const [selectedThing, setSelectedThing] = useState(null);
    const [newThingForm, setNewThingForm] = useState(null);
    const [deletionMode, setDeletionMode] = useState(null);
    const [thingData, setThingData] = useState({sex: 'FEMALE'});
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedId, setEditedId] = useState(null);

    const handleRowClick = (id) => {
        const fetchData = async () => {
            setSelectedThing(await getOne(objName, id));
        };
        fetchData();
    }

    const handleThingChanges = (e) => {
        const {name, value} = e.target;
        setThingData({
            ...thingData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdating) {
            try {
                const response = await updateOne(objName, editedId, thingData);
                alert('Ингредиент успешно изменён');
                setNewThingForm(null);
                setThingData({});
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
                const newVisitor = await createOne(objName, thingData);
                alert('Ингредиент успешно внесён');
                setNewThingForm(null);
            } catch (e) {
                console.error(e);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
            }
        }
    }

    const handleEditClick = async (id) => {
        try {
            const response = await getOne(objName, id);
            setThingData(response);
            
            setNewThingForm(true);
            setIsUpdating(true);
            
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }
    
    const handleDeleteClick = async (id) => {
        try {
            await deleteOne(objName, id);
            alert('Ингредиент успешно удалён');
            setNewThingForm(null);
            setDeletionMode(null);
            setSelectedThing(null);
            setData(data.filter(el => el.id !== id));
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при удалении данных. Попробуйте в другой раз');
        }
    }

    const handleClose = () => {
        setNewThingForm(null);
        setIsUpdating(null);
        setThingData({});
    }

    useEffect(() => {
        if (props.thing) setSelectedThing(props.thing);

        const fetchData = async () => {
            setData(await getAll(objName));
        }
        fetchData();
    }, []);

    return (

        // Список объектов
        <div className="container">
            <h1>Ингредиенты</h1>
            <button className="create-btn" onClick={() => setNewThingForm(true)}>Добавить ингредиент</button>
            {data && (<Table columns={[["id", "id"],
                             ["наименование", "name"],
                             ["количество", "quantity"],
                             ["единиц.изм", "unit"]]}
                   data={data}
                   handleRowClick={handleRowClick}
                   />)}

            {/* Подробная инфа об объекте */}
            {selectedThing && (
                <InventoryItem thing={selectedThing} 
                         setSelectedThing={setSelectedThing}
                         setEditedId={setEditedId}
                         handleEditClick={handleEditClick}
                         setDeletionMode={setDeletionMode}
                         getThing={getOne}></InventoryItem>
            )}


            {/* Обновление / создание нового объекта */}
            {newThingForm && 
                <DataForm title={"ингредиент"}
                          onClose={handleClose}
                          handleSubmit={handleSubmit}
                          handleChange={handleThingChanges}
                          data={thingData}
                          columns={[{text: "Введите наименование: ", type: "text", name: "name"},
                                    {text: "Введите количество: ", type: "number", name: "quantity"},
                                    {text: "Укажите единицу измерения: ", type: "select", name:"unit", options: [
                                        {value: "l", text: "Литры"},
                                        {value: "g", text: "Граммы"},
                                        {value: "kg", text: "Килограммы"},
                                        {value: "tea-sp", text: "Чайные ложки"},
                                        {value: "table-sp", text: "Столовые ложки"},
                                        {value: "piece", text: "Штуки"},
                                    ]}
                          ]}
                          isUpdating={isUpdating}></DataForm>
            }


            {/* Удаление объекта */}
            {deletionMode && (
                <Deletion title="ингредиент"
                          onClose={setDeletionMode}
                          obj={deletionMode}
                          handleDeleteClick={handleDeleteClick}
                          setDeletionMode={setDeletionMode}></Deletion>
                
            )}
        </div>
    );
};

export default Inventory;