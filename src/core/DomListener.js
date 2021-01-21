import {capitalize} from "@/core/utils";

export class DomListener {
    constructor($root, listeners = []) {

        if(!$root) {
            throw new Error('no variable root for DomListener')
        }

        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            const name = this.name || ''
            if(!this[method]) {
                throw new Error(`Метод ${method} не реализован в
                ${name} Component`)
            }
            this[method] = this[method].bind(this)
            //тоже самое что eventListener
            this.$root.on(listener, this[method])
        })

    }

    removeDomListeners() {

        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}