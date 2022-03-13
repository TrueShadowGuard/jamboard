import React from 'react';
import {observer} from "mobx-react-lite";
import sheetsStore from "@/state/sheets_store";
import classes from "./Titlebar.module.scss";
import classNames from "classnames";

const Titlebar = observer(() => {
    return (
        <header className={classes.titlebar}>
            <div className={classes.buttons}>
                <span className={classNames("material-icons", classes.open)}
                      title={"open file"}
                >file_open
                </span>
                <span className={classNames("material-icons", classes.download)}
                      title={"download file"}
                      onClick={() => sheetsStore.download()}
                >file_download
                </span>
            </div>
            <input className={classes.fileName}
                   type="text"
                   placeholder={"file.jam"}
            />
        </header>
    );
});

export default Titlebar;