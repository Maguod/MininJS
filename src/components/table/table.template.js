import {DEFAULT_STYLES} from "@/constants";
import {toInlineStyles} from "@/core/utils";
import {parse} from "@/core/parse";

const CODES = {
    A: 65,
    Z: 90
}
const DEFAULT_WIDTH = 90
const DEFAULT_HEIGHT = 24
// function toCell(_, col) {
//     return `
//     <div class="cell" contenteditable data-col="${col}"></div>
//     `
// }
function toCell(state, row) {
    return function (_, col) {
        // console.log(state.colState[col])
        const id = `${row}:${col}`
        const width = getWidth(state.colState, col)
        const data = state.dataState[id]
        const styles = toInlineStyles({
            ...DEFAULT_STYLES,
            ...state.stylesState[id]
        })
        return `
            <div class="cell" 
            contenteditable 
            data-col="${col}"
            data-type="cell"
            data-id="${id}"
            data-value="${data || ''}"
            style="${styles}; ${width}"
            >${parse(data) || ''}</div>
    `
    }
}

function toColumn({col, index, width}) {
    return `
     <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>    
     </div>
    `
}

function createRow(index,  content, state) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    const height = getHeight(state, index)
    return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
        <div class="row-info">${index ? index : ''} ${resize}</div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function mmxToChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function getWidth(state , index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}
function getHeight(state , index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}
function withWidthFrom(state) {
    return function (col, index) {
        return {
            col,
            index,
            width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsTable = 50, state) {

    const colsCount = CODES.Z - CODES.A + 1
    const  rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(mmxToChar)
        // .map((col , index) => { //переписываем лгику + добавляем ф-цию withWidthFrom
        //     const width = getWidth(state.colState, index)
        //     return toColumn(col , index, width)
        // })
        .map(withWidthFrom(state))
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

    rows.push(createRow(null, cols, {}))

    for(let row = 0; row < rowsTable; row++) {
        const cell = new Array(colsCount)
            .fill('')
            // .map(toCell)
            .map(toCell(state, row))
            .join('')
        rows.push(createRow(row+1, cell, state.rowState))
    }

    return rows.join('')
}