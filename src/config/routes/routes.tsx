import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "../../pages/Dashboard";
import { Login } from "../../pages/Login";




const RouterPages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route Component={Dashboard} path="/dashboard" />
                <Route Component={Login} path="/login" />
            </Routes>
        </BrowserRouter>

    )
}


export default RouterPages;