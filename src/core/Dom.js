class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if(typeof html === 'string') {

            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }
    text(text) {
        if(typeof text === 'string' ) {
            this.$el.textContent = text
            return this
        }
        //проверяем что если значение пришло из input, для точности название тэга приводим к нижнему регистру
        if(this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }
    clear() {
        this.html('')
        return this
    }
    find(selector) {
        return $(this.$el.querySelector(selector))
    }
    id(parsElem) {
        if(parsElem) {
            const $pars = this.id().split(':')
            return {
                row: +$pars[0],
                col: +$pars[1],
            }
        }
        return this.data.id
    }
    focus() {
        this.$el.focus()
        return this
    }
    //node это элемент
    append(node) {
        if(node instanceof Dom) {
            node = node.$el
        }

        if(Element.prototype.append) {
            this.$el.append(node)
        }else {
            this.$el.appendChild(node)
        }

        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector)) //мне не просто вернули, а сразу обернули в обертку нашего самописного DOM
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }
    get data() {
        return this.$el.dataset
    }
    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }
    css(styles = {}) {
        for (const styleEl in styles)  {
            //проверка. Она обязательна для этого цикла for in
            // if(styles.hasOwnProperty(styleEl)) {
            //     console.log(styleEl, styles[styleEl])
            // } поэтому для обхода объекта используем более простую и удобную конструкцию
            Object.keys(styles).forEach(key => {
                this.$el.style[key] = styles[key]
            })

        }
    }
    addClass(className) {
        this.$el.classList.add(className)
        return this
    }
    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)

    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

}

export function $(selector) {
    return new Dom(selector)
}
$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if(classes) {
        el.classList.add(classes)
    }

    return $(el)
}