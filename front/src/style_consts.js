const variables = {
    TITLE_BAR_HEIGHT: 41,
    TOOL_BAR_WIDTH: 41
}

addVariablesInCss(variables);

module.exports = variables;

function addVariablesInCss(variables) {
    let style = '';
    style += "#root {"
    for(let [property, value] of Object.entries(variables)) {
        if(typeof value === "number") value += "px";
        style += `--${property}:${value};`;
    }
    style += "}";

    const $style = document.createElement("style");
    $style.innerHTML = style;

    document.head.appendChild($style);
}
