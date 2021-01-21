const CODES = {
    A: 65,
    Z: 90
}
function toCell(content = '') {
    return `
    <div class="cell" contenteditable="">${content}</div>
    `
}
function toColumn(el) {
    return `
     <div class="column">${el}</div>
    `
}
function createRow(content, numberRow = '') {
    return `
    <div class="row">
        <div class="row-info">${numberRow}</div>
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

    rows.push(createRow(cols))

    for(let i = 0; i < rowsTable; i++) {
        const cell = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(cell, i+1))
    }

    return rows.join('')
}