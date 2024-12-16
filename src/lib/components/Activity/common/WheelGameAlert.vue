<template>
    <teleport to="#mask_modal" v-if="data.mounted">
        <view class="dialog-modal">
            <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
            <view
                class="dialog-view"
                @click.stop="() => {}"
                v-show="data.isShow"
            >
                <view class="dialog-content">
                    <view class="alert-type-img">
                        <img src="@/static/icon/faild.png" alt="" />
                    </view>
                    <view class="alert-title">
                        {{ $t('KEY_SPINWHEEL_GOODLUCK') }}
                    </view>
                    <view class="alert-message">
                        {{ $t('KEY_SPINWHEEL_INSUFFICIENT') }}
                    </view>
                    <view
                        class="alert-game"
                        @click="openGame(data.game, 'Gamepaly-btn-click')"
                    >
                        <image
                            class="img"
                            :src="data.game.icon"
                            mode="aspectFill"
                        />
                        <view class="jackpot">
                            <text v-if="store.baseConfig.countryId === 'BRA'">
                                R$
                            </text>
                            <text v-else>$</text>
                            {{ data.game.jackpot }}
                        </view>
                    </view>
                    <view
                        class="primary-btn"
                        @click="openGame(data.game, 'Gamepaly-btn-click')"
                    >
                        {{ $t('KEY_SPINWHEEL_PLAY') }}
                    </view>
                    <view class="tips">{{ $t('KEY_SPINWHEEL_TIPS') }}</view>
                </view>
            </view>
        </view>
    </teleport>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, watch } from 'vue'
    import MaskModal from '@/lib/components/MaskModal/index.vue'
    import { i18n } from '@/common/i18nConfig'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { i18nStore } from '@/store/i18nStore'
    import { ga } from '@/common/common'
    import _ from 'lodash'
    import { openGame } from '@/common/game'

    const store = useUsersStore()
    const { t: $t } = i18n.global

    interface Props {
        rouletteGame: any
    }

    const props = withDefaults(defineProps<Props>(), {
        rouletteGame: [],
    })

    interface Data {
        isShow: Boolean
        mounted: boolean
        game: any
    }
    const data = reactive<Data>({
        isShow: false,
        mounted: false,
        game: {},
    })
    const emit = defineEmits(['onSuccess', 'onFaild'])
    const RefModal = ref()

    watch(
        () => props.rouletteGame,
        (val) => {
            const randomIndex = Math.floor(Math.random() * val.length)
            data.game = val[randomIndex]
        }
    )

    const maskClick = () => {
        changeIsShow(false)
    }

    const changeIsShow = (isShow) => {
        if (isShow) {
            
            const randomIndex = Math.floor(
                Math.random() * props.rouletteGame.length
            )
            data.game = props.rouletteGame[randomIndex]
        }
        RefModal.value.changeModal(isShow)
        data.isShow = isShow
    }

    const success = () => {
        emit('onSuccess')
        changeIsShow(false)
    }

    const faild = () => {
        emit('onFaild')
        changeIsShow(false)
    }

    onMounted(() => {
        data.mounted = true
    })

    defineExpose({
        changeIsShow,
    })
</script>

<style lang="scss">
    .dialog-modal {
    }
    .modal-view {
        @apply fixed left-0 right-0 bottom-0 top-0;
        z-index: 1002;
    }
    .dialog-view {
        @apply absolute box-border;
        z-index: 1003;
        background: #fff;
        border-radius: 14rpx;
        width: 667rpx;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 34rpx 24rpx;
        color: #454545;
    }
    .dialog-content {
        @apply flex flex-col items-center;
        .alert-type-img {
            width: 85rpx;
            img {
                @apply w-full;
            }
        }
        .alert-title {
            font-size: 42rpx;
            font-weight: bold;
            color: #000000;
            margin-top: 37rpx;
        }
        .alert-message {
            font-size: 34rpx;
            font-weight: bold;
            color: #000000;
            margin-top: 25rpx;
            text-align: center;
        }
    }

    .primary-btn {
        margin-top: 38rpx;
    }

    .dialog-message {
        @apply flex justify-center items-center;
        font-size: 1.03125rem;
        font-weight: bold;
        min-height: 160rpx;
    }

    .btn-view {
        @apply flex;
        margin-top: 30rpx;
    }

    .info-btn {
        margin-right: 50rpx;
    }
    .alert-game {
        width: 465rpx;
        border-radius: 7rpx;
        overflow: hidden;
        margin-top: 25rpx;
        .img {
            width: 100%;
            height: 180rpx;
            display: block;
        }
        .jackpot {
            @apply flex justify-center items-center w-full;
            height: 50rpx;
            font-size: 21rpx;
            background-color: #821818;
            color: #fff;
        }
    }
    .tips {
        font-size: 25rpx;
        color: #a8a8a8;
        margin-top: 17rpx;
    }
</style>
