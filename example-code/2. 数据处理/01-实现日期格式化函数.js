const dateFormat = (dateInput, format) => {
    const day = dateInput.getDate()
    const month = dateInput.getMonth() + 1;
    const year = dateInput.getFullYear();
    format = format.replace(/yyyy/, year);
    format = format.replace(/MM/, month);
    format = format.replace(/dd/, day);
    return format
}

const dateFormatPlus = (dateInput, format) => {
    const date = {
        yyyy: dateInput.getFullYear(),
        yy: ("" + dateInput.getFullYear()).slice(-2),
        M: dateInput.getMonth() + 1,
        MM: ("0" + (dateInput.getMonth() + 1)).slice(-2),
        d: dateInput.getDate(),
        dd: ("0" + dateInput.getDate()).slice(-2),
        H: dateInput.getHours(),
        HH: ("0" + dateInput.getHours()).slice(-2),
        h: dateInput.getHours() % 12,
        hh: ("0" + dateInput.getHours() % 12).slice(-2),
        m: dateInput.getMinutes(),
        mm: ("0" + dateInput.getMinutes()).slice(-2),
        s: dateInput.getSeconds(),
        ss: ("0" + dateInput.getSeconds()).slice(-2),
        w: ['日', '一', '二', '三', '四', '五', '六'][dateInput.getDay()]
    }
    return format.replace(/([a-z]+)/ig,function($1){
        return date[$1]
    })
}

console.log(dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd')) // 2020年04月01日)