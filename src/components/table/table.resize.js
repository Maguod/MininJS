import {$} from "@/core/Dom";

export function resizeHandler($root, event) {

    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]') //норм вариант - ищем по дата атрибуту
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value
    $resizer.css({
        opacity: 1,
        [sideProp]: '-100vw'
    })
// обработчик события на нажатие кнопки мыши
    document.onmousemove = (e) => {
        if ('col' === type) {
            const delta = Math.floor(e.pageX - parseInt(coords.right))
            value = coords.width + delta
            // $parent.$el.style.width = value + 'px'
            $resizer.css({
                right: - delta + 'px',
                // bottom: '-100vh'
            })
            // childs.forEach( elem => elem.style.width = value + 'px')
        } else  {
            const delta = Math.floor(e.pageY - parseInt(coords.bottom))
            value = coords.height + delta
            $resizer.css({
                bottom: -delta + 'px',
            })
            // childs.forEach( elem => elem.style.height = value + 'px')
        }
    }
//убираем обработчик события когда отпускаем кнопку мыши
    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
        if ('col' === type) {
            $root.findAll(`[data-col="${$parent.data.col}"]`)
                .forEach(el => el.style.width = value + 'px')
            // $parent.$el.style.width = value + 'px'
            $parent.css({
                width: value + 'px'
            })

        }else {
            $parent.css({
                height: value + 'px'
            })
        }
    }

}