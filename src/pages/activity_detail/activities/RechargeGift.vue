<template>
    <view class="activity-view">
        <view
            class="banner"
            v-if="
                store.baseConfig.operatorId === 'own_lobby_bra3' ||
                store.baseConfig.operatorId === 'own_lobby_bra7'
            "
        >
            <img src="@/static/activity/banner_recharge_back_bra3.jpg" />
        </view>
        <view class="banner" v-else>
            <img src="@/static/activity/bannner_recharge_back_operator.jpg" />
        </view>
        <view class="detail">
            <view
                class="title font-bold color-white"
                v-html="$t('KEY_ACTIVITY_RECHARGE_GIFT_TITLE')"
            ></view>
            <view
                class="desc"
                v-html="rule2"
                v-if="
                    store.baseConfig.operatorId === 'own_lobby_bra3' ||
                    store.baseConfig.operatorId === 'own_lobby_bra7'
                "
            ></view>
            <view class="desc" v-html="rule" v-else></view>
            <view
                class="normal-btn bg-primary"
                @click="goDeposit"
                v-html="$t('KEY_ACTIVITY_RECHARGE_GIFT_BTN')"
            ></view>

            <view class="statement" v-html="statement"></view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    // import { message } from '@/lib/components/Message'
    import { getPlatform } from '@/common/init'

    const commonStore = useCommonStore()
    const store = useUsersStore()
    const { t: $t } = i18n.global
    // const msg = message(
    //     'You have a successful recharge orderPlease check at the personal center'
    // )
    // console.log(msg)
    const rule = computed(() => {
        // return $t('KEY_ACTIVITY_RECHARGE_GIFT_RULE30X')
        //     ?.replace('#percent1#', '100')
        //     ?.replace('#percent2#', '100')
        //     ?.replace('#percent3#', '100')
        //     ?.replace('#percent4#', '100')
        return `Deposite mais de R$50 e ganhe até R$1000 de bônus!<br/>
                Depósito R$10-R$19: bônus de 50%<br/>
                Depósito R$20-R$49: bônus de 70%<br/>
                Depósito R$50-R$20000: bônus de 100% (máx. R$1000)<br/>`
    })

    const rule2 = `Depósitos acima de R$20 são qualificados para receber o bônus de 100%, com um limite máximo de R$1000 em bônus por depósito. Não há limite no número de vezes que você pode aproveitar essa oferta.`
    onMounted(() => {
        
    })
    const statement = computed(() => {
        let str = '30'
        const suffer =
            str === '1'
                ? $t('KEY_ACTIVITY_RECHARGE_GIFT_STATMENT_TIME')
                : $t('KEY_ACTIVITY_RECHARGE_GIFT_STATMENT_TIMES')
        str += suffer
        return $t('KEY_ACTIVITY_RECHARGE_GIFT_STATMENT', {domain: getPlatform()})?.replace(
            '#times#',
            str
        )
    })
    const goDeposit = async () => {
        // const msg2 = message({
        //     type: 'warning',
        //     message: 'ccc',
        //     duration: 9999,
        // })
        // console.log(msg2)
        commonStore.depositTab = 0
        uni.switchTab({ url: '/pages/deposit/index' })
    }
</script>

<style lang="scss">
    .activity-view {
        min-height: 100%;

        .banner {
            @apply w-full;
            img {
                @apply w-full h-full;
            }
        }
        .detail {
            padding: 0 42rpx;
            min-height: 350rpx;
            .title {
                font-size: 33rpx;
                line-height: 42rpx;
                margin-top: 53rpx;
            }
            .desc {
                font-size: 28rpx;
                color: #cdcfcf;
                line-height: 42rpx;
                margin-top: 18rpx;
            }
            .normal-btn {
                margin-top: 80rpx;
            }
            .statement {
                margin-top: 74rpx;
                font-size: 28rpx;
                color: #cdcfcf;
                line-height: 42rpx;
            }
        }
    }
</style>
