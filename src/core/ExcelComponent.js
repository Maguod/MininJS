import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name
        this.emitter = options.emitter
        this.unsubscribers  = []
        this.prepare()

    }
    //настраиваем наш конпонент до события init
    prepare() {

    }
//уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
//подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    //возвращает шаблон компонента
    toHTML() {
        return ''
    }
//инициализируем компонент
//добавляем DOM слушателей
    init() {
        this.initDomListeners()
    }
//удаляем компонент
//удаляем DOM слушателей
    destroy() {
        this.removeDomListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}