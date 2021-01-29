import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {shouldResize} from "@/components/table/tableFunctions";

export class Table extends ExcelComponent{
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
        })
    }

    toHTML() {
       return createTable()
    }

    onClick(event) {
        // console.log('onClick', event)
    }
    onMousedown(event) {
        // console.log('onMousedown', event.target.getAttribute('data-resize'))
        if(shouldResize(event)) {
            resizeHandler(this.$root, event)

        }

    }
    onMouseup(event) {
        // console.log('Mouseup', event)
    }
    onMousemove(event) {
        // console.log('onMousemove')
    }

}