import React from 'react';
import {Sheets, Titlebar} from "./components";
import "@/common.scss";
import Toolbar from "@components/Toolbar/Toolbar";

const App = () => {
    return (
        <>
            <Titlebar/>
            <Toolbar/>
            <Sheets/>
        </>
    );
};

export default App;