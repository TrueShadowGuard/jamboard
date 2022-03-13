import React, {useRef, useState} from 'react';
import classes from "./Sheets.module.scss";
import {observer} from "mobx-react-lite";
import sheetsStore from "@/state/sheets_store";
import classNames from "classnames";
import usePressedKeys from "@/hooks/usePressedKeys";

const Sheet = observer(({sheetModel}) => {

    const [moving, setMoving] = useState(false);

    const keys = usePressedKeys(["Shift"]);
    const shiftRef = useRef();
    shiftRef.current = keys.Shift;

    const style = {
        left: sheetModel.x,
        top: sheetModel.y,
        width: sheetModel.width,
        height: sheetModel.height
    };

    const sheetClassName = classNames({
       [classes.sheet]: true,
       [classes.moving]: moving
    });

    const resizeClassName = classNames({
        [classes.resize]: true,
        [classes.shift]: shiftRef.current
    })

    return (
        <div className={sheetClassName}
             style={style}
             onMouseDown={handleMouseDown}
        >
            <div className={classes.settings}>
                <span className="material-icons">settings</span>
            </div>
            <div className={classes.delete} onClick={handleDeleteClick}>
                <span className="material-icons">delete</span>
            </div>
            <div className={resizeClassName}/>
        </div>
    );

    function handleMouseDown(e) {
        if(e.target.closest("." + classes.delete)) {
            return;
        }

        sheetsStore.raiseSheet(sheetModel);
        if(e.target.closest("." + classes.settings)) {
            return;
        }
        if(e.target.closest("." + classes.resize)) {
            startResizing(e);
            return;
        }
        startMoving(e);
    }

    function startMoving(e) {
        setMoving(true);
        const coords = {top: sheetModel.y, left: sheetModel.x};
        const shiftX = e.pageX - coords.left;
        const shiftY = e.pageY - coords.top;

        const moveToCursor = (e) => {
            sheetModel.moveTo(e.pageX - shiftX, e.pageY - shiftY);
        };
        window.addEventListener("mousemove", moveToCursor);
        window.addEventListener("mouseup", () => {
            setMoving(false);
            window.removeEventListener("mousemove", moveToCursor);
        });
    }

    function startResizing() {
        const resize = (e) => {
            if(shiftRef.current) {
                const dX = e.pageX - sheetModel.width - sheetModel.x;
                const dY = e.pageY - sheetModel.height - sheetModel.y;
                const multiplierX = (sheetModel.width + dX) / sheetModel.width;
                const multiplierY = (sheetModel.height + dY) / sheetModel.height;
                const multiplier = multiplierX / 2 + multiplierY / 2;
                sheetModel.resize(sheetModel.width * multiplier, sheetModel.height * multiplier);
            } else {
                sheetModel.resize(e.pageX - sheetModel.x, e.pageY - sheetModel.y);
            }
        };
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", resize);
        });
    }

    function handleDeleteClick(e) {
        sheetsStore.deleteSheet(sheetModel);
    }
});

export default Sheet;