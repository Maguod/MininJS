export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }
//$el instance of DOM class
    select($el) {
        this.clear()
        this.group.push($el)
        $el.focus().addClass('selected')
        this.current = $el
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }

    get selectedIds(){
        return this.group.map(el=> el.id())
    }

    clear() {
        this.group.forEach($el => {
            $el.removeClass(TableSelection.className)
        })
        this.group = []
    }
    applyStyle(style) {
        this.group.forEach(el => {
            el.css(style)
        })
    }
}