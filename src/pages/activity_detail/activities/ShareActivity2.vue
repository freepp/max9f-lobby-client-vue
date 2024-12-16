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
                <view class="title">Compartilhe e Ganhe Sem Limites!</view>
                <view class="rules-content">
                    <b>Sobre o Evento:</b>
                    <br />
                    Amplie a sua diversão e ganhe prêmios incríveis ao
                    compartilhar o nosso jogo nas suas redes sociais! Se você
                    ama jogar conosco, essa é a chance de se beneficiar ainda
                    mais!
                    <br />
                    Todos os membros da plataforma podem receber uma recompensa
                    gratuita de R$88 ao publicar uma imagem específica oficial e
                    um link de promoção em suas páginas pessoais do Facebook. (O
                    conteúdo da imagem inclui um QR Code pessoal para
                    compartilhamento e o link do jogo). Instruções abaixo da
                    imagem orientam os jogadores a clicar e manter pressionada a
                    imagem para salvá-la em seu álbum.
                </view>
                <view class="rules-content">
                    <b>Passo a Passo:</b>
                    <br />
                    Compartilhe a imagem oficial com link do jogo em seu
                    Facebook.
                    <br />
                    Cumpra os requisitos específicos de compartilhamento.
                    <br />
                    Entre em contato com a nossa equipe para reivindicar seu
                    prêmio!
                </view>
                <view class="rules-content">
                    <b>Detalhes:</b>
                    <br />
                    Todos os membros da plataforma têm a oportunidade de ganhar
                    um prêmio de R$88. Basta fazer uma postagem em seu Facebook
                    pessoal com uma de nossas imagens oficiais e o link
                    promocional. Dica: Mantenha pressionada a imagem para
                    salvá-la em seu dispositivo!
                </view>
                <view class="rules-content">
                    <b>Requisitos e Recompensas:</b>
                </view>

                <view class="percent-table">
                    <view class="tr">
                        <view class="th">Fãs no FB</view>
                        <view class="td">＞100</view>
                    </view>
                    <view class="tr">
                        <view class="th">Curtidas</view>
                        <view class="td">20+</view>
                    </view>
                    <view class="tr">
                        <view class="th">Requisitos</view>
                        <view class="td">
                            postagem deve ser pública e ficar online por pelo
                            menos 24 horas.
                        </view>
                    </view>
                    <view class="tr">
                        <view class="th">Prêmio</view>
                        <view class="td">R$8</view>
                    </view>
                </view>

                <view class="rules-content">
                    <b>
                        Número de Grupos do Facebook onde você compartilhou a
                        postagem:
                    </b>
                </view>

                <view class="percent-table">
                    <view class="tr">
                        <view class="th">Grupos do FB Compartilhados</view>
                        <view class="th">FPrêmio</view>
                    </view>
                    <view class="tr">
                        <view class="td">3</view>
                        <view class="td">R$8</view>
                    </view>
                    <view class="tr">
                        <view class="td">7</view>
                        <view class="td">R$18</view>
                    </view>
                    <view class="tr">
                        <view class="td">30</view>
                        <view class="td">R$38</view>
                    </view>
                    <view class="tr">
                        <view class="td">50</view>
                        <view class="td">R$88</view>
                    </view>
                    <view class="tr">
                        <view class="td">100</view>
                        <view class="td">R$128</view>
                    </view>
                    <view class="tr">
                        <view class="td">300</view>
                        <view class="td">R$177</view>
                    </view>
                </view>
                <view class="rules-content">
                    <b>Regras do Evento:</b>
                    <br />
                    1.Como Participar e Ganhar Recompensas? Por exemplo: O
                    Jogador A tem mais de 100 amigos no Facebook. Ao postar um
                    conteúdo em sua página pessoal do Facebook e receber pelo
                    menos 20 curtidas, ele pode ganhar R$8. Alternativamente, se
                    o post for compartilhado em 30 grupos, o jogador também pode
                    ganhar R$38. Se ambas as condições forem cumpridas, duas
                    recompensas podem ser ganhas. Posts em grupos e artigos
                    compartilhados devem ser mantidos por pelo menos 24 horas.
                    <br />
                    2.Como Entrar em Contato para Receber a Recompensa? Membros
                    que atendem aos critérios acima podem entrar em contato com
                    o atendimento ao cliente através do atalho disponível.
                    <br />
                    3.Restrições de Participação: Cada membro, cada endereço IP
                    e cada dispositivo de login podem participar apenas uma vez
                    no evento. Participar deste evento significa que você
                    concorda com os "Termos e Condições de Eventos da
                    Plataforma".
                    <br />
                    4.Condições Gerais: Este evento é aplicável apenas para
                    operações manuais legítimas da conta do titular. É proibido
                    o uso de aluguel, software de terceiros, robôs, jogos
                    multiusuários, colaborações, arbitragem, API, protocolos,
                    exploração de vulnerabilidades, e outros meios técnicos. O
                    não cumprimento dessas regras pode resultar em cancelamento
                    ou dedução de prêmios, congelamento de contas ou até mesmo
                    inclusão na lista negra.
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
                padding: 0 20rpx;
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
