import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, matrix, nextSelector, shouldResize} from "@/components/table/tableFunctions";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@/core/Dom";
import {parse} from "@/core/parse";
import * as actions from "@/redux/actions"
import {DEFAULT_STYLES} from "@/constants";

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
       return createTable(65, this.store.getState())
    }
    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init();

        const $sell = this.$root.find('[data-id="0:0"]')

        this.selectCell($sell)
        //переписываем для парсинга фолрмулы ввода значений пользователем в командой строке Excel переимновали text на value
        // this.$on('formula:input', text => {
        //     this.selection.current.text(text)
        //     this.updateTextInStore(text)
        // })
        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
        // this.$subscribe(state => {
        //     console.log('stateTable', state)
        // })
        this.$on('toolbar:applyStyle', style => {
            this.selection.applyStyle(style)
            this.$dispatch(actions.applyStyle({
                value: style,
                ids: this.selection.selectedIds
            }))
        })

    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES))
        this.$dispatch(actions.changeStyles(styles))

    }
    onClick(event) {
        // console.log('onClick', event)
    }
    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            console.log('Resize from table.js', data)
            // это переделали на строчку ниже this.$dispatch({type: TABLE_RESIZE, data})
            this.$dispatch(actions.tableResize(data))
            // console.log('resize data: ', data)
        }catch(e) {
            console.error(e.message)
        }

    }
    onMousedown(event) {
        // console.log('onMousedown', event.target.getAttribute('data-resize'))
        if(shouldResize(event)) {
            this.resizeTable(event)

        }else if(isCell(event)) {
            const $target = $(event.target)

            if(event.shiftKey) { //если shift зажат значит группа
                const cells = matrix( $target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup(cells)
            }else { // если нет - обычный селект
                // this.selection.select($target)
                this.selectCell($target)
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

    updateTextInStore(value) {

        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        //this.$emit('table:input', $(event.target))
        this.updateTextInStore($(event.target).text())
    }

}



