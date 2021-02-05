import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, matrix, nextSelector, shouldResize} from "@/components/table/tableFunctions";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@/core/Dom";
import {range} from "@/core/utils";

export class Table extends ExcelComponent{
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'mousedown', 'mousemove', 'mouseup', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
       return createTable(35)
    }
    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init();

        const $sell = this.$root.find('[data-id="0:0"]')

        this.selectCell($sell)
        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }
    onClick(event) {
        // console.log('onClick', event)
    }
    onMousedown(event) {
        // console.log('onMousedown', event.target.getAttribute('data-resize'))
        if(shouldResize(event)) {
            resizeHandler(this.$root, event)

        }else if(isCell(event)) {
            const $target = $(event.target)

            if(event.shiftKey) { //если shift зажат значит группа

                const cells = matrix(this.selection.current, $target).map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup(cells)
            }else { // если нет - обычный селект
                this.selection.select($target)
            }

        }

    }
    onMouseup(event) {
        // console.log('Mouseup', event)
    }
    onMousemove(event) {
        // console.log('onMousemove')
    }
    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
        ]

        const {key} = event

        if(keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const next = this.$root.find(nextSelector(key, id))
            this.selectCell(next)
        }

    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }

}



