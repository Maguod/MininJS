import {Page} from "@/core/routes/Page";
import {createStore} from "@/core/createStore";
import {debounce, storage} from "@/core/utils";
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Table} from "@/components/table/Table";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {rootReducer} from "@/redux/rootReducer";
import {normalizeInitialState} from "@/redux/initialState";

function storageName(param) {
    // console.log('ExcelPage params', param[1])
    return 'excel:'+param
}

export class ExcelPage extends Page {

    constructor(param) {
        super(param)
        this.storeSub = null
    }
    getRoot() {

        const params = this.params ? this.params: Date.now().toString()
        const state = storage(storageName(params))
        const store = createStore(rootReducer, normalizeInitialState(state))
        const stateListener = debounce(state => {
            storage(storageName(params), state)
        }, 300)
        this.storeSub = store.subscribe(stateListener)
        this.excel = new Excel({
            components: [Header, Table, Toolbar, Formula],
            store
        })

        return this.excel.getRoot()
        // excel.render()
    }

    //после рендера инициализируем приложения и события\слушатели
    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
        this.storeSub.unsubscribe()
    }
}