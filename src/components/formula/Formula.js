import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@/core/Dom";

export class Formula extends ExcelComponent{
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return `<div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>`
    }
    init() {
        super.init();
        this.$formula = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            this.$formula.text($cell.data.value)
        })
        // this.$on('table:input', $cell => {
        //     this.formula.text($cell.text())
        // })
        // this.$subscribe(state => {
        //     console.log('Formula update', state.currentText)
        //     this.formula.text(state.currentText)
        // }) //рефакторим. удаляем подписку из компонента
    }
    storeChanged(changes) {
        // console.log(changes)
    }

    onInput(event) {
        this.$emit('formula:input',$(event.target).text())
    }

    onClick(event) {
        // console.log(event)
    }
    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if(keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }

    }
}