import React from "react";
import { Route, Routes } from "react-router-dom";

import Users from "@app/pages/Users";
import Repositories from "@app/pages/Repositories";

const AppRoutes = (props) => {

    return (
        <Routes>
            <Route
                exact
                path="/"
                element={<Users/>}
            />

            <Route
                
                path="/repository"
                element={<Repositories/>}
            />


        </Routes>
    );
};

export default AppRoutes;
