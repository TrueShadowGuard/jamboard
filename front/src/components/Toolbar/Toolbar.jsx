import React from 'react';
import {observer} from "mobx-react-lite";
import sheetsStore from "@/state/sheets_store";
import classes from "./Toolbar.module.scss";
import toolbarStore, {actions} from "@/state/toolbar_store";

const Toolbar = observer(() => {
    return (
        <aside className={classes.toolbar}>
            <span className="material-icons" onClick={selectAction(actions.CREATE_SHEET)}>dashboard</span>
            <span className="material-icons" onClick={selectAction(actions.ZOOM_IN)}>zoom_in</span>
            <span className="material-icons" onClick={selectAction(actions.ZOOM_OUT)}>zoom_out</span>
        </aside>
    );

    function selectAction(action) {
        return (e) => toolbarStore.selectAction(action)
    }
});

export default Toolbar;