import { ref } from 'vue'
export const pozIndex = ref(0)
let timer = null
export const startInterval = () => {
    if (timer) {
        return
    }
    timer = setInterval(() => {
        pozIndex.value += 1
        if (pozIndex.value >= 5) {
            pozIndex.value = 0
        }
    }, 100)
}
export const stopInterval = () => {
    timer && clearInterval(timer)
    timer = null
}
