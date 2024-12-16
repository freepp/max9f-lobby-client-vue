<template>
    <Layout
        :header-title="$t('KEY_SIGNIN_REWARDSCENTER')"
        :has-header="hasHeader"
    >
        <view class="scroll-view">
            <!-- <signinView /> -->
            <SigninViewNew />
            <Tasks />
            <!-- <view v-else>
                <view class="days-table">
                    <view class="tr">
                        <view
                            class="th"
                            v-html="$t('KEY_ACTIVITY_CHECK_IN_TH1')"
                        ></view>
                        <view
                            class="th"
                            v-html="$t('KEY_ACTIVITY_CHECK_IN_TH2')"
                        ></view>
                    </view>
                    <view class="tr">
                        <view
                            class="td"
                            v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY1')"
                        ></view>
                        <view class="td">
                            {{ signLevelList[0]?.minMoney }}-{{
                                signLevelList[0]?.maxMoney
                            }}
                        </view>
                    </view>
                    <view class="tr">
                        <view
                            class="td"
                            v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY2')"
                        ></view>
                        <view class="td">
                            {{ signLevelList[1]?.minMoney }}-{{
                                signLevelList[1]?.maxMoney
                            }}
                        </view>
                    </view>
                    <view class="tr">
                        <view
                            class="td"
                            v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY3')"
                        ></view>
                        <view class="td">
                            {{ signLevelList[2]?.minMoney }}-{{
                                signLevelList[2]?.maxMoney
                            }}
                        </view>
                    </view>
                    <view class="tr">
                        <view
                            class="td"
                            v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY4')"
                        ></view>
                        <view class="td">
                            {{ signLevelList[3]?.minMoney }}-{{
                                signLevelList[3]?.maxMoney
                            }}
                        </view>
                    </view>
                    <view class="tr">
                        <view
                            class="td"
                            v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY5')"
                        ></view>
                        <view class="td">
                            {{ signLevelList[4]?.minMoney }}-{{
                                signLevelList[4]?.maxMoney
                            }}
                        </view>
                    </view>
                    <view class="tr">
                        <view
                            class="td"
                            v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY6')"
                        ></view>
                        <view class="td">
                            {{ signLevelList[5]?.minMoney }}-{{
                                signLevelList[5]?.maxMoney
                            }}
                        </view>
                    </view>
                    <view class="tr">
                        <view
                            class="td"
                            v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY7')"
                        ></view>
                        <view class="td">
                            {{ signLevelList[6]?.minMoney }}-{{
                                signLevelList[6]?.maxMoney
                            }}
                        </view>
                    </view>
                </view>
                <view
                    class="statement"
                    v-html="$t('KEY_SIGNIN_CONTENT')"
                ></view>
            </view> -->

            <view class="empty-space"></view>
        </view>
    </Layout>
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    // import signinView from './SigninView.vue'
    import SigninViewNew from './SigninViewNew.vue'
    import Tasks from './Tasks.vue'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
      hasHeader?: boolean
    }

    withDefaults(defineProps<Props>(), {
      hasHeader: true,
    })

    const data = reactive<any>({
        name: 'Signin',
    })
    const signLevelList = ref<any>([
        {
            minMoney: 1,
            maxMoney: 20,
        },
        {
            minMoney: 1,
            maxMoney: 20,
        },
        {
            minMoney: 1,
            maxMoney: 50,
        },
        {
            minMoney: 2,
            maxMoney: 50,
        },
        {
            minMoney: 2,
            maxMoney: 100,
        },
        {
            minMoney: 2,
            maxMoney: 100,
        },
        {
            minMoney: 5,
            maxMoney: 200,
        },
    ])

    onMounted(() => {
        // ga('rewardpage_rewardpage_view')
        uni.setNavigationBarTitle({
            title: $t('KEY_SIGNIN_REWARDSCENTER'),
        })
    })
</script>
<style lang="scss">
    .scroll-view {
        @apply absolute top-0 right-0 bottom-0 left-0;
        padding: 24rpx 0;
    }

    .days-table {
        @apply table text-black font-bold text-center;
        margin: 50rpx auto 0;
        font-size: 33rpx;
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
    .statement {
        @apply text-white-90;
        margin-top: 48rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 35rpx;
        padding: 0 1.25rem;
    }
    .empty-space {
        height: 105rpx;
    }
</style>
