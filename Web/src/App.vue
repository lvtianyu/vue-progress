<template>

 <router-view transition="page"></router-view>

</template>

<style>
    @keyframes rotateFall {
        0% {
            transform: rotateZ(0deg);
        }
        20% {
            transform: rotateZ(10deg);
            animation-timing-function: ease-out;
        }
        40% {
            transform: rotateZ(17deg);
        }
        60% {
            transform: rotateZ(16deg);
        }
        100% {
            transform: translateY(100%) rotateZ(17deg);
        }
    }
    
    @keyframes slideOutLeft {
        to {
            transform: translateX(-100%);
        }
    }
    
    @keyframes rotateOutNewspaper {
        to {
            transform: translateZ(-3000px) rotateZ(360deg);
            opacity: 0;
        }
    }
    
    @-webkit-keyframes scaleUp {
        from {
            -webkit-opacity: 1;
            -webkit-transform: scale(1);
        }
        to {
            -webkit-opacity: 0.3;
            -webkit-transform: scale(0.7);
        }
    }
    
    @keyframes scaleUp {
        from {
            opacity: 1;
            -webkit-transform: scale(1);
        }
        @keyframes slideInRight {
            from {
                -webkit-transform: translateX(100%);
            }
            to {
                -webkit-transform: translateX(0);
            }
        }
        @keyframes slideInDown {
            from {
                -webkit-transform: translateY(100%);
            }
            to {
                -webkit-transform: translateY(0);
            }
        }
        @keyframes slideInUp {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(100%);
            }
        }
    }
    
    .page-enter {
        /*animation: slideInDown 0.5s both ease-in;*/
        /*animation: slideInDown 0.5s both ease-in;*/
        /*animation-delay: 0.2s;*/
    }
    
    .page-leave {
        /*transform-origin: 0% 0%;*/
        /*animation: rotateFall 1s both ease-in;*/
        /*animation: scaleUp 0.5s both ease-in;*/
        /*animation: scaleUp 0.5s both ease-in;*/
    }
</style>