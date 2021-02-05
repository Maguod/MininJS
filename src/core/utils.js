//Концепт Pure functions
export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    //если старт > end то нам нужно поменять их местами что бы не было отрицательных значений
    if(start > end) {
        [end, start] = [start, end]
    }

    return new Array(end - start+1)
        .fill('')
        .map((_, index) => start + index)
}

