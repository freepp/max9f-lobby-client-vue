<template>
    <Transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
    >
        <slot></slot>
    </Transition>
</template>

<script lang="ts" setup>
const beforeLeave = (el) => {
    el.style.transition = '0.3s height ease-in-out'
    el.style.overflow = 'hidden'
}
const leave = (el) => {
    el.style.height = 'auto'
    el.style.height = window.getComputedStyle(el).height
    el.offsetHeight
    el.style.height = '0px'
}
const afterLeave = (el) => {
    el.style.transition = ''
    el.style.overflow = 'visible'
}

const beforeEnter = (el) => {
    el.style.transition = '0.3s height ease-in-out'
    el.style.overflow = 'hidden'
}
const enter = (el) => {
    el.style.height = 'auto'
    const endWidth = window.getComputedStyle(el).height
    el.style.height = '0px'
    el.offsetHeight
    el.style.height = endWidth
}
const afterEnter = (el) => {
    el.style.transition = ''
    el.style.overflow = 'visible'
}
</script>
