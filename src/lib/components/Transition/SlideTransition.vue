<template>
    <Transition name="slide">
        <slot></slot>
    </Transition>
</template>

<style lang="scss">
    .slide-enter-active {
        animation-name: slideInUp;
        animation-duration: 0.4s;
        animation-fill-mode: both;
    }
    .slide-leave-active {
        animation-name: slideOutDown;
        animation-duration: 0.4s;
        animation-fill-mode: both;
    }
    @keyframes slideInUp {
        0% {
            transform: translate3d(0, -100%, 0);
            visibility: visible;
        }

        to {
            transform: translateZ(0);
        }
    }
    @keyframes slideOutDown {
        0% {
            transform: translateZ(0);
        }

        to {
            visibility: hidden;
            transform: translate3d(0, -100%, 0);
        }
    }
    .delay-leave-active {
        -webkit-animation-delay: 0.2s;
        -moz-animation-delay: 0.2s;
        -o-animation-delay: 0.2s;
        animation-delay: 0.2s;
    }
</style>
