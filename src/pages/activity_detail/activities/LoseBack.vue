<template>
    <view class="activity-view">
        <image
            class="w-full"
            src="@/static/activity/lose_back_banner.png"
            mode="widthFix"
        ></image>
        <view class="detail">
            <view class="title" v-html="$t('KEY_LOSE_TITLE')"></view>
            <view class="rule" v-if="data.tableData.length > 0">
                Jogadores que tiverem perdas reais em slots e jogos exclusivos
                poderão receber até R${{
                    numberWithCommas(data.tableData[0].maxAmount)
                }}
                de reembolso.
                <br />
                A interpretação final do evento é de responsabilidade da
                plataforma {{domain}}.
                <br />
                Contas que forem identificadas com conduta inadequada na
                obtenção do bônus poderão ser congeladas.
            </view>
            <view class="percent-table">
                <view class="tr">
                    <view class="th">VALOR </view>
                    <view class="th">CASHBACK BONUS</view>
                </view>
                <view class="tr" v-for="item in data.tableData">
                    <view class="td">
                        >R${{ item.rangeMin }}
                    </view>
                    <view class="td">
                        {{ item.cashMultip }}
                    </view>
                </view>
            </view>
            <!-- <view class="license" v-html="$t('KEY_LOSE_LICENSE')"></view> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { ga, numberWithCommas } from '@/common/common'
    import { onMounted, watch, reactive } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { getPlatform } from "@/common/init"

    
    const domain = getPlatform()

    const store = useUsersStore()

    const data = reactive<any>({
        tableData: [],
    })

    const tableData = [
        { bonus: '>R$10/R$50', percent: 'MIN R$ 2/MAX  R$10' },
        { bonus: '>R$50/R$100', percent: 'MIN R$ 5/MAX  R$10' },
        { bonus: '>R$100/R$500', percent: 'MIN R$ 5/MAX  R$25' },
        { bonus: '>R$500', percent: 'MIN R$ 25/MAX R$10.000' },
    ]

    const loseCashBack = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        const res = await lobbyApi.loseCashBack.about(params)
        if (res.success) {
            data.tableData = res.result.items
        } else {
            ErrorHandler(res, 'loseCashBack')
        }
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            loseCashBack()
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
            padding: 51rpx 41rpx 36rpx;
            .title {
                @apply font-bold;
                font-size: 33rpx;
                font-weight: bold;
                color: #ffffff;
                line-height: 33rpx;
            }
            .rule {
                @apply text-white-90;
                width: 656rpx;
                margin-top: 17rpx;
                font-size: 28rpx;
                line-height: 35rpx;
            }
            .percent-table {
                @apply table text-black font-bold text-center;
                margin: 27rpx auto 0;
                font-size: 26rpx;
                border-collapse: collapse;
                border-radius: 7rpx;
                overflow: hidden;
                .tr {
                    @apply table-row;
                    .th,
                    .td {
                        @apply table-cell bg-white;
                        width: 334rpx;
                        height: 90rpx;
                        line-height: 90rpx;
                        border: 1px solid #000;
                    }
                    .th {
                        @apply text-white-100;
                        background: linear-gradient(0deg, #282a2d, #39424a);
                        border-top-width: 0;
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
            .license {
                @apply text-white-90;
                width: 634rpx;
                font-size: 28rpx;
                line-height: 35rpx;
                margin-top: 33rpx;
            }
        }
    }
</style>
