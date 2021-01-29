const CODES = {
    A: 65,
    Z: 90
}

function toCell(_, col) {
    return `
    <div class="cell" contenteditable data-col="${col}"></div>
    `
}

function toColumn(el, index) {
    return `
     <div class="column" data-type="resizable" data-col="${index}">
        ${el}
        <div class="col-resize" data-resize="col"></div>    
     </div>
    `
}

function createRow(index,  content) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
    <div class="row" data-type="resizable">
        <div class="row-info">${index ? index : ''} ${resize}</div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function mmxToChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsTable = 50) {
    const colsCount = CODES.Z - CODES.A + 1
    const  rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(mmxToChar)
        .map(toColumn)
        .join('')
        /* Было так. Переписали выше. Переменные пробрасываются по умолчанию
        .fill('')
        .map((el, index) => {
            return String.fromCharCode(CODES.A + index)
        })
        .map((el) => {
            return createCol(el)
        }).join('')
        */

    rows.push(createRow(null, cols))

    for(let i = 0; i < rowsTable; i++) {
        const cell = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(i+1, cell ))
    }

    return rows.join('')
}