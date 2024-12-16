<template>
    <view class="activity-view">
        <image
            class="w-full"
            src="@/static/activity/1.4-share.jpg"
            mode="widthFix"
        ></image>
        <view class="detail">
            <view class="share-view">
                <view class="item title">
                    <view class="item-name">{{ $t('KEY_SHARE_SHARE') }}</view>
                    <!-- <view class="item-value" @click="goDetail">
                        <text>{{ $t('KEY_SHARE_DETAIL') }}</text>
                        <img src="@/static/icon/jiantou_R_disable.png" alt="" />
                    </view> -->
                </view>
                <view class="share-wrap">
                    <share :promoteUser="{ pUrl: store.userInfo?.userId }" />
                </view>
            </view>
            <view class="rules">
                <view class="title">
                    Ganhe Dinheiro Sem Limites Compartilhando
                </view>
                <view class="rules-content">
                    <b>Descrição da Promoção</b>
                    <br />
                    1.Todos os membros da plataforma podem ganhar uma recompensa
                    gratuita de R$25 ao compartilhar a imagem oficial de
                    publicidade da nossa plataforma no Facebook, YouTube,
                    Instagram e TikTok. (O conteúdo da imagem inclui um QR code
                    pessoal e o link do jogo). Abaixo da imagem, há instruções
                    indicando que os jogadores podem clicar e manter pressionada
                    a imagem para salvá-la em seu álbum.
                </view>
                <view class="rules-content">
                    <b>Regras da Promoção e Recompensas</b>
                </view>
                <view class="percent-table">
                    <view class="tr">
                        <view class="th">Participantes</view>
                        <view class="td">Membros da Plataforma</view>
                    </view>
                    <view class="tr">
                        <view class="th">Plataformas Participantes</view>
                        <view class="td">
                            Facebook YouTube Instagram TikTok
                        </view>
                    </view>
                    <view class="tr">
                        <view class="th">Prêmio de Compartilhamento</view>
                        <view class="td">R$5</view>
                    </view>
                    <view class="tr">
                        <view class="th">
                            Prêmio do Compartilhamento de Amigos
                        </view>
                        <view class="td">R$10</view>
                    </view>
                    <view class="tr">
                        <view class="th">Prêmio de 24h</view>
                        <view class="td">R$15</view>
                    </view>
                    <view class="tr">
                        <view class="th">Prêmio Total</view>
                        <view class="td">R$25</view>
                    </view>
                </view>
                <view class="rules-content">
                    1.Os membros da plataforma devem compartilhar imagens de
                    publicidade da nossa plataforma no Facebook, YouTube,
                    Instagram ou TikTok. Após 5 compartilhamentos por amigos,
                    você pode tirar um print e entrar em contato com o
                    atendimento ao cliente para receber sua recompensa. Como
                    aplicar: Tire um print da postagem e entre em contato com o
                    atendimento ao cliente para receber R$10. A recompensa será
                    fornecida dentro de 24 horas.
                    <br />
                    2.Esta promoção é aplicável apenas para operações feitas
                    manualmente pelo titular da conta. O uso de bots, programas
                    automatizados, múltiplos jogadores, técnicas de arbitragem,
                    interfaces, protocolos, exploração de bugs, ou qualquer
                    outra técnica ilegítima é proibido. A não conformidade pode
                    resultar em cancelamento ou dedução de recompensas,
                    congelamento da conta ou inclusão na lista negra.
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { ga } from '@/common/common'
    import { onMounted, watch, reactive, computed } from 'vue'
    import share from '@/pages/agent/components/share.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { numberWithCommas } from '@/common/common'
    import { i18n } from '@/common/i18nConfig'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        activityAbout: any
    }

    const data = reactive<Data>({
        activityAbout: {},
    })

    const rule = computed(() => (item: any, type: number) => {
        switch (type) {
            case 1:
                return $t('KEY_ACTIVITY_SHARE_TIP1')?.replace(
                    '#payFlowMultip#',
                    item.payFlowMultip
                )
                break
            case 2:
                return $t('KEY_ACTIVITY_SHARE_TIP2')
                    ?.replace('#numFlowMultip#', item.numFlowMultip)
                    ?.replace('#numPayAmount#', item.numPayAmount)
                break
            default:
        }
    })

    const getActivityAbout = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.inviteNewuser.about(params)
        if (res.success) {
            data.activityAbout = res.result
        } else {
            ErrorHandler(res, 'getActivityAbout')
        }
    }

    const goDetail = () => {
        uni.navigateTo({
            url: '/pages/share_detail/index',
        })
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            getActivityAbout()
        }
    }

    onMounted(() => {
        initData()
    })
</script>

<style lang="scss">
    .activity-view {
        min-height: 100%;
        .detail {
            padding: 40rpx;
            .share-view {
                @apply bg-black-80 rounded-14 overflow-hidden;
                margin-bottom: 60rpx;
            }
            .title {
                @apply font-bold;
                font-size: 33rpx;
                font-weight: bold;
                color: #ffffff;
            }
            .share-wrap {
                padding: 30rpx;
            }
            .card {
                @apply w-full bg-black-80 relative;
                height: 244rpx;
                border-radius: 8rpx;
                margin-bottom: 35rpx;
                .card-detail {
                    @apply flex items-center justify-between;
                    .card-item {
                        @apply flex-1 flex flex-col items-center relative justify-center;
                        height: 200rpx;
                        .cash {
                            font-size: 44rpx;
                            font-weight: bold;
                            margin-bottom: 10rpx;
                            z-index: 10;
                        }
                        .tips {
                            font-size: 22rpx;
                            color: #ffffff;
                            line-height: 28rpx;
                            opacity: 0.8;
                            z-index: 10;
                        }
                        .bg-icon {
                            @apply absolute;
                            width: 120rpx;
                            z-index: 1;
                        }
                    }
                }
                .time {
                    @apply flex items-center justify-center absolute bottom-0 box-border truncate;
                    // width: 400rpx;
                    height: 48rpx;
                    background-color: #272727;
                    border-radius: 42rpx 42rpx 0px 0px;
                    left: 50%;
                    padding: 0 50rpx;
                    transform: translate(-50%);
                }
            }
            .btn-view {
                @apply flex items-center justify-between;
                .normal-btn {
                    width: 326rpx;
                    font-size: 28rpx;
                }
            }
            .rules {
                @apply text-white-90;
                margin-top: 50rpx;

                .rules-title {
                    @apply flex justify-center items-center;
                    margin-bottom: 30rpx;
                    .title {
                        font-size: 28rpx;
                        font-weight: bold;
                        color: #7c7c7c;
                        margin: 0 36rpx;
                    }
                    .line {
                        width: 120rpx;
                        height: 3rpx;
                        background: #878789;
                    }
                }
                .rules-content {
                    margin: 30rpx 0;
                    b {
                        line-height: 40rpx;
                        font-size: 28rpx;
                    }
                    ::v-deep p {
                        line-height: 28rpx;
                        font-size: 22rpx;
                        font-weight: 400;
                        color: #cdcfcf;
                    }
                }
            }
        }
    }

    .item {
        @apply flex items-center justify-center box-border;
        height: 102rpx;
        border-bottom: 2rpx solid #475464;
        padding: 0 20rpx;

        .item-name {
            @apply text-left flex items-center;
            color: #7590ab;
            font-size: 28rpx;
            font-weight: 400;
        }
        .item-value {
            @apply text-right flex items-center justify-end;
            color: #8d8e8e;
            font-size: 28rpx;
            font-weight: 400;
            img {
                width: 17rpx;
                margin-left: 10rpx;
            }
        }
        .icon-right {
            height: 28rpx;
            margin-left: 20rpx;
        }
        &.title {
            @apply flex justify-between;
            .item-name,
            .item-value {
                @apply text-white-100 h-full;
            }
        }
        &:last-child {
            border: none;
        }
    }
    .percent-table {
        @apply table text-black font-bold text-center w-full;
        margin: 27rpx auto 0;
        font-size: 28rpx;
        border-collapse: collapse;
        border-radius: 7rpx;
        overflow: hidden;
        .tr {
            @apply table-row;
            .th,
            .td {
                @apply table-cell bg-white;
                height: 90rpx;
                // line-height: 90rpx;
                border: 1px solid #000;
                vertical-align: middle;
            }
            .th {
                @apply text-white-100;
                // width: 200rpx;
                background: linear-gradient(0deg, #282a2d, #39424a);
                border-top-width: 0;
                font-size: 28rpx;
                padding: 10rpx 20rpx;
            }
        }
        .tr .th:first-child,
        .tr .td:first-child {
            border-left-width: 0;
        }
        .tr .th:last-child,
        .tr .td:last-child {
            border-right-width: 0;
        }
        .tr:last-child .td {
            border-bottom-width: 0;
        }
    }
</style>
