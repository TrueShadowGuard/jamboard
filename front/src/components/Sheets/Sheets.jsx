import React from 'react';
import {observer} from "mobx-react-lite";
import sheetsStore from "@/state/sheets_store";
import Sheet from "./Sheet";
import toolbar_store, {actions} from "@/state/toolbar_store";

import classes from "./Sheets.module.scss";
import classNames from "classnames";

const Sheets = observer(() => {

    const eventHandlers = {};
    const sheetsStyle = {
        transform: `scale(${sheetsStore.scale})`
    };

    switch(toolbar_store.selectedAction) {
        case actions.CREATE_SHEET:
            eventHandlers.onMouseDown = createSheet;
            break;
        case actions.ZOOM_IN:
            eventHandlers.onMouseDown = ifTargetEqualCurrentTarget(() => sheetsStore.zoomIn(1.1));
            break;
        case actions.ZOOM_OUT:
            eventHandlers.onMouseDown = ifTargetEqualCurrentTarget(() => sheetsStore.zoomOut(1.1));
            break;
    }

    const sheetsClassName = classNames(classes.sheets, classes[toolbar_store.selectedAction])

    return (
        <div className={sheetsClassName} style={sheetsStyle} {...eventHandlers} id="sheets">
            {sheetsStore.sheets.map(sheetModel => (
                <Sheet sheetModel={sheetModel} key={sheetModel.id}/>
            ))}
        </div>
    );
});

function createSheet(e) {
    if(e.target === e.currentTarget) {
        sheetsStore.createSheet(e.pageX, e.pageY);
    }
}

function zoomIn() {

}

function zoomOut() {

}

function ifTargetEqualCurrentTarget(cb) {
    return function (e) {
        if(e.target !== e.currentTarget) return;
        cb(e);
    }
}

export default Sheets;