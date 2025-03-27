import axios from "axios";
import { serverPath } from "./mainPath";

export const getAll = async (objectName) => {
    try {
        const response = await axios.get(serverPath + "/" + objectName);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}

export const getOne = async (objectName, id) => {
    try {
        const response = await axios.get(serverPath + "/" + objectName + "/" + id);
        return response.data;
    } catch (error) {
        console.log(serverPath + "/" + objectName + "/" + id);
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}

export const createOne = async (objectName, object) => {
    try {
        const response = await axios.post(serverPath + "/" + objectName, object);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}

export const updateOne = async (objectName, id, newObject) => {
    try {
        const response = await axios.put(serverPath + "/" + objectName + "/" + id, newObject);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}

export const deleteOne = async (objectName, id) => {
    try {
        const response = await axios.delete(serverPath + "/" + objectName + "/" + id);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}