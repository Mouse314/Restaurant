import React, { useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import Restaurant from "../page/Restaurant";
import Auth from "../page/Auth";
import Admin from "../page/Admin";
import { Context } from "..";

const AppRouter = () => {
    const {user} = useContext(Context);
    return (
        <Routes>
            {
                user.is_auth && <Route exact key={5} path="/admin" element={<Admin/>}/>
            }
            {[
                <Route exact key={1} path="/" element={<Restaurant/>}/>,
                <Route exact key={1} path="/admin" element={<Admin/>}/>,
                <Route exact key={3} path="/login" element={<Auth/>}/>,
                <Route exact key={4} path="/registration" element={<Auth/>}/>,
                <Route exact key={5} path="*" element={<Navigate replace to="/" />}/>,
            ]}
        </Routes>
    );
};

export default AppRouter;