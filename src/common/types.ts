interface Number {
    add: (arg: number) => number
    sub: (arg: number) => number
    mul: (arg: number) => number
    div: (arg: number) => number
    toFixed: (arg?: number) => string
}
Number.prototype.toFixed = function (d = 0) {
    let changeNum: number | string = this + '' // 把数字转为字符串
    if (changeNum.indexOf('-') != -1) {
        // 判断是否是负数
        changeNum = Math.abs(Number(changeNum))
    }
    changeNum = (
        Math.round(Number(changeNum) * Math.pow(10, d)) / Math.pow(10, d)
    ).toString()
    const index = changeNum.indexOf('.') // 判断字符是否有小数点
    if (index === -1) {
        // 如果没有小数点，加上对应个数的小数点
        changeNum += '.'
        changeNum += new Array(d + 1).join('0')
    } else if (index > 0) {
        // 如果有，index是小数点的坐标值，比如在第二位index=1
        const temp = d - (changeNum.length - index - 1) // 小数点后的位数小于要取舍的个数，用0补齐；数字的长度-小数点的坐标值-1=小数的位数(小数点也占以为，4.00 length:4;.的index是1)
        if (temp > 0) {
            changeNum += new Array(temp + 1).join('0')
        }
    }
    if (this.toString().indexOf('-') != -1) {
        // 如果是负数，加上-
        changeNum = '-' + changeNum
    }
    return changeNum
}
Number.prototype.add = function (arg2) {
    const arg1 = this
    let r1, r2
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    const m = Math.pow(10, Math.max(r1, r2))

    return (arg1 * m + arg2 * m) / m
}
Number.prototype.sub = function (arg2) {
    const arg1 = this
    let r1, r2
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    const m = Math.pow(10, Math.max(r1, r2)) // 动态控制精度长度
    const n = r1 >= r2 ? r1 : r2
    return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n))
}
Number.prototype.mul = function (arg2) {
    const arg1 = this
    let m = 0
    const s1 = arg1.toString()
    const s2 = arg2.toString()
    try {
        m += s1.split('.')[1].length
    } catch (e) {
        m += 0
    }
    try {
        m += s2.split('.')[1].length
    } catch (e) {
        m += 0
    }
    return (
        (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
        Math.pow(10, m)
    )
}
Number.prototype.div = function (arg2) {
    const arg1 = this
    let t1 = 0
    let t2 = 0
    try {
        t1 = this.toString().split('.')[1].length
    } catch (e) {
        t1 = 0
    }
    try {
        t2 = arg2.toString().split('.')[1].length
    } catch (e) {
        t2 = 0
    }
    const r1 = Number(arg1.toString().replace('.', ''))
    const r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
}
