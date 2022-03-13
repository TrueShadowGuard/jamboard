import {makeAutoObservable, toJS} from "mobx";
import {TITLE_BAR_HEIGHT, TOOL_BAR_WIDTH} from "@/style_consts";
import download from "@/utils/download";
const uid = Math.random;

let $sheets;
setTimeout(() => {
    $sheets = document.getElementById("sheets");
})


class SheetsStore {
    sheets = [];
    sheetSize = 200;
    header = "";
    scale = 1;
    constructor() {
        makeAutoObservable(this);
    }

    createSheet(x, y) {
        this.sheets.push(new SheetModel(x / this.scale, y / this.scale, this.sheetSize, this));
    }

    deleteSheet(sheet) {
        this.sheets = this.sheets.filter(sheetI => sheetI !== sheet);
    }

    raiseSheet(sheetModel) {
        const index = this.sheets.findIndex(sheetModelI => sheetModelI === sheetModel);
        this.sheets.push(
            this.sheets.splice(index,1)[0]
        );
    }

    recalcBodyWidth() {
        const width = this.sheets.reduce((max, curr) => max.x > curr.x ? max : curr).x + this.sheetSize;
        $sheets.style.minWidth = width + "px";
    }

    recalcBodyHeight() {
        const height = this.sheets.reduce((max, curr) => max.y > curr.y ? max : curr).y + this.sheetSize;
        $sheets.style.minHeight = height + "px";
    }

    zoomIn(value) {
        this.scale *= value;
    }

    zoomOut(value) {
        this.scale /= value;
    }

    download() {
        const json = JSON.stringify({
            header: this.header || "unnamed.jam",
            sheets: toJS(this.sheets.map(sheet => {
                const copy = {...sheet};
                delete copy.store;
                return copy;
            }))
        });
        download(json, this.header || "unnamed.jam");
    }
}

class SheetModel {
    constructor(x, y, size, store) {
        this.x = x - size / 2;
        this.y = y - size / 2;
        if(this.y < TITLE_BAR_HEIGHT) this.y = TITLE_BAR_HEIGHT;
        if(this.x < TOOL_BAR_WIDTH) this.x = TOOL_BAR_WIDTH;

        this.width = size;
        this.height = size;
        this.store = store;
        this.id = uid();

        makeAutoObservable(this);
    }

    moveTo(x, y) {
        x = x || this.x;
        y = y || this.y;
        if(y < TITLE_BAR_HEIGHT) y = TITLE_BAR_HEIGHT;
        if(x < TOOL_BAR_WIDTH) x = TOOL_BAR_WIDTH;

        this.store.recalcBodyWidth();
        this.store.recalcBodyHeight();

        this.x = x;
        this.y = y;
    }

    resize(width, height) {
        this.width =  width || this.width;
        this.height = height || this.height;

        if(this.width < 50) this.width = 50;
        if(this.height < 32) this.height = 32;
    }
}

const sheetsStore = new SheetsStore();
window._debug = window.debug || {};
window._debug.sheetsStore = sheetsStore;

export default sheetsStore;