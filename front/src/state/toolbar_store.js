import {makeAutoObservable} from "mobx";
import sheetsStore from "@/state/sheets_store";

export const actions = {
    CREATE_SHEET: "createSheet",
    ZOOM_IN: "zoomIn",
    ZOOM_OUT: "zoomOut"
}

class ToolbarStore {
    selectedAction = actions.CREATE_SHEET;

    constructor() {
        makeAutoObservable(this);
    }

    selectAction(action) {
        this.selectedAction = action;
    }
}

const toolbarStore = new ToolbarStore();
window._debug = window.debug || {};
window._debug.sheetsStore = sheetsStore;

export default toolbarStore;