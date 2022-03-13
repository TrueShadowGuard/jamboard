import {useEffect, useState} from "react";

export default function usePressedKeys(keys) {
    const [pressedKeys, setPressedKeys] = useState({});
    useEffect(() => {
        document.body.addEventListener("keydown", addPressedKey);
        document.body.addEventListener("keyup", removePressedKey);
        return () => {
            document.body.removeEventListener("keydown", addPressedKey);
            document.body.removeEventListener("keyup", removePressedKey);
        }
    });
    return pressedKeys;

    function addPressedKey(e) {
        if(!keys.includes(e.key)) return;
        pressedKeys[e.key] = true;
        setPressedKeys({...pressedKeys});
    }

    function removePressedKey(e) {
        delete pressedKeys[e.key];
        setPressedKeys({...pressedKeys});
    }
}