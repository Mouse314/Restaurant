// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Проверяем авторизацию при загрузке
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            // Можно добавить запрос к серверу для проверки сессии
            setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (password) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('isAuthenticated', 'true');
                setIsAuthenticated(true);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error };
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/logout', {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
          
            localStorage.removeItem('isAuthenticated');
            setIsAuthenticated(false);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: 'Ошибка при выходе' };
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);