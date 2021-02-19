import {$} from "@/core/Dom";
import {ActiveRoute} from "@/core/routes/ActiveRoute";

export class Router {
    constructor(selector, routes) {
        if(!selector){
            throw new Error('selector is required')
        }
        this.$placeholder = $(selector)
        this.routes = routes
        this.page = null
        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()

    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        //нужно не просто навесить событие но и вызвать его
        this.changePageHandler()
    }
    changePageHandler() {
        if(this.page) {
            this.page.destroy()
        }
        this.$placeholder.clear()
        //тут по хорошему написать парсер строки для url, но у нас задача простая, пару страниц
        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard
        //конец парсера. В общем он принимает url
        this.page = new Page(ActiveRoute.param)

        this.$placeholder.append(this.page.getRoot())
        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}