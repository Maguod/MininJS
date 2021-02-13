import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers  = []
        // this.storeSub  = null //рефактор 6.13
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
    $dispatch(action) {
        this.store.dispatch(action)
    }
    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn)
    // } //рефактор 6.13

    storeChanged() {} //сбда приходят изменения только по тем полям на которые мы подписались

    isWatching(key) {
        return this.subscribe.includes(key)
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
        // this.storeSub.unsubscribe() //рефактор 6.13
    }
}