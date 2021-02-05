export class Emitter {
    constructor() {
        this.listeners = {}
    }

    //dispatch, fire, trigger
    //уведомляем слушателей сели они есть
   //хочу что бы вызывались примерно так: table.emit('table:select', {a:1})
    emit(event, ...args) {
        if(!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true

    }

    //on, listener - уведомляем сулшателей сели они есть
    //хочу что бы вызывались примерно так: table.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []  //если ключа нет в объекте то пустой массив
        this.listeners[event].push(fn)
        //что бы не утекала память нужно удалить слушатели от которых отписались
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}