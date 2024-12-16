<template>
  <Layout :header-title="'VIP'" :transparentHeader="true" :slotStyle="{ 'background': '#000' }">
    <view class="vip_view">
      <view class="vip_header">
        <view class="vip_header_bg_bg" :class="`vip_header_bg_bg${current > 11 ? 12 : current}`" :style="{opacity: current < 8 ? 1 : 0}"></view>
        <image class="light" :style="{opacity: current < 8 ? 1 : 0}" src="@/static/vip/newVip/light.png" alt="" />
        <image class="vip_header_bg" :style="{opacity: current >= 8 && current < 10 ? 1 : 0}" :src="light9" alt="" />
        <image class="vip_header_bg" :style="{opacity: current >= 10 && current < 12 ? 1 : 0}" :src="light11" alt="" />
        <image class="vip_header_bg" :style="{opacity: current >= 12 ? 1 : 0}" :src="light13" alt="" />


        <swiper
          class="vip_swiper"
          previous-margin="35rpx"
          next-margin="35rpx"
          :autoplay="false"
          :current="defaultCurrent"
          @animationfinish="swiperChange"
        >
          <swiper-item class="vip_swiper_item" v-for="(item, idx) in vipList" :key="idx">
            <view class="vip_box" :id="`vip_box${(idx + 1) > 12 ? 13 : idx + 1}`" :style="{background: `url('/static/vip/newVip/${(idx + 1) > 12 ? 13 : (idx + 1) % 2 ? idx + 1 : idx}_vip_bg.png') no-repeat`, 'background-size': '100% 100%'}">
              <view >
                <image class="vip_start" :class="{'vip_start_small': !((idx + 1) % 2)}" :src="`/static/vip/newVip/${(idx + 1) % 2 ? `${(idx + 1 )> 12 ? 13 : (idx + 1)}_II` : `${(idx + 1 )> 12 ? 14 : (idx + 1)}_I`}.png`" alt="" />
                <view class="box_header">
                  <image v-if="idx > 11" class="vip13" src="@/static/vip/newVip/13_yy.png" alt="" />
                  <text class="box_header_vip">VIP{{ idx + 1 }}</text>
                  <text v-if="data.vip === idx + 1" class="current_tag" :class="{'current_tag_small': idx + 1 >= 10}">{{ $t('KEY_VIP_CURRENT_LEVEL').toLocaleUpperCase() }}</text>
                </view>
                <view class="vip_main">
                  <view class="vip_main_info">
                    <view class="vip_lv">
                      <text>VIP{{ idx + 1 }}</text>
                      <text>{{ idx + 1 === vipList.length ? '' : `VIP${idx + 2}` }}</text>
                    </view>
                    <view class="vip_progress vip_progress_top">
                      <text>{{ $t('KEY_VIP_DEPOSITS') }}</text>
                      <text>{{ idx + 1 === vipList.length ? 'Max' : `R$${(data.totalPayAmount || 0) >= (item.needPayAmount || 0) ? item.needPayAmount || 0 : _.floor(data.totalPayAmount || 0)}` }} / {{ idx + 1 === vipList.length ? 'Max' : `R$${item.needPayAmount || 0}` }}</text>
                    </view>
                    <progress :percent="item.totalPayAmountPercent" active :duration="10" />
                    <view class="vip_progress">
                      <text>{{ $t('KEY_VIP_BETS') }}</text>
                      <text>{{ idx + 1 === vipList.length ? 'Max' : `R$${(data.totalCashBetAmount || 0) >= (item.needCashBetAmount || 0) ? item.needCashBetAmount || 0 : _.floor(data.totalCashBetAmount || 0)}` }} / {{ idx + 1 === vipList.length ? 'Max' : `R$${item.needCashBetAmount || 0}` }}</text>
                    </view>
                    <progress :percent="item.totalCashBetAmountPercent" active :duration="10" />
                  </view>
                  <view v-if="item.totalPayAmountPercent < 100 || item.totalCashBetAmountPercent < 100" class="vip_btn" :style="{background: `url('/static/vip/newVip/${(idx + 1) > 12 ? 13 : (idx + 1) % 2 ? idx + 1 : idx}_btn_bg.png') no-repeat`, 'background-size': '100% 100%'}" @click="levelAdvance(item)">{{ $t('KEY_VIP_LEVEL_ADVANCE') }}</view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>

        <view class="vip_schedule">
          <view class="other_v prev_v" v-show="current > 0">
            <view>VIP{{ current || 1 }}</view>
            <image class="schedule_img" src="@/static/vip/newVip/other_v.png" alt="" />
          </view>
          <view class="current_v">
            <view>VIP{{ (current + 1) || 1 }}</view>
            <image class="schedule_img" src="@/static/vip/newVip/current_v.png" alt="" />
          </view>
          <view class="other_v next_v" v-show="(current + 1) < vipList.length">
            <view>VIP{{ (current + 2) || 1 }}</view>
            <image class="schedule_img" src="@/static/vip/newVip/other_v.png" alt="" />
          </view>
        </view>
      </view>

      <view class="vip_privileges">
        <view class="vip_title">
          <image src="@/static/vip/newVip/title_left.png" alt="" />
          <text>{{ `VIP ${current + 1} ${$t('KEY_VIP_LEVEL_PRIVILEGES')}` }}</text>
          <image src="@/static/vip/newVip/title_right.png" alt="" />
        </view>

        <view class="vip_grid_box">
          <view class="vip_grid_item" v-for="i in 3" :key="i">
            <image :src="`/static/vip/newVip/grid${i}.png`" alt="" />
            <view class="vip_grid_num">{{ _.floor((vipList?.[current]?.[ConfigItemsKey[i]] ?? 0) * (i < 4 ? 100 : 1), 2) }}{{ i < 4 ? '%' : '' }}</view>
            <view class="vip_grid_tips">{{ ConfigItemsName[i] }}</view>
          </view>
        </view>
      </view>

      <view class="vip_rights">
        <view class="vip_title">
          <image src="@/static/vip/newVip/title_left.png" alt="" />
          <text>{{ $t('KEY_VIP_MY_RIGHTS') }}</text>
          <image src="@/static/vip/newVip/title_right.png" alt="" />
        </view>

        <view class="vip_rights_box">
          <image class="doubt" :style="{zIndex: doubt1 ? 3 : 1}" src="@/static/vip/newVip/doubt.png" alt="" @click="showMaskModal('doubt1')" />
          <view class="doubt_box" v-show="doubt1">
            <view class="doubt_title">{{ $t('KEY_VIP_DAILY_CASHBACK_RULES') }}</view>
            <view class="doubt_text">
              {{ $t('KEY_VIP_DAILY_CASHBACK_RULES1') }}
              <br />
              {{ $t('KEY_VIP_DAILY_CASHBACK_RULES2') }}
              <br />
              {{ $t('KEY_VIP_DAILY_CASHBACK_RULES3') }}
            </view>
          </view>
          <view class="rights_title">
            {{ $t('KEY_VIP_DAILY_CASHBACK') }}
            <text class="rights_title_num"> {{ _.floor((data.cashBackDayRate || 0) * 100, 2) }}%</text>
            <text class="rights_title_max"> (MAX:{{ _.floor((data.cashBackDayMaxRate || 0) * 100, 2) }}%)</text>
          </view>
          <view class="rights_tips">{{ $t('KEY_VIP_TIPS1') }}</view>
          <view class="rights_gold">
            <view class="gold_box">
              <Spine
                v-if="_.floor(data.cashBackDayReciveAmount || 0, 2)"
                id="vip_jinbidui1"
                class="spine_vip"
                :skelName="'vip_jinbidui'"
                :assetsUrl="`./static/spinspine/index/vip_spine/`"
                animName="animation"
              ></Spine>
              <image v-else class="gold_img" src="@/static/vip/newVip/gold.png" alt="" />
            </view>
            <view class="gold">R$ {{ numberWithCommas(_.floor(data.cashBackDayReciveAmount || 0, 2)) }}</view>
          </view>
          <view class="rights_title">{{ $t('KEY_VIP_YESTERDAY_BONUS') }}</view>
          <view class="rights_tips">
            {{ $t('KEY_VIP_CLAIM_PERIOD') }}
            <view style="margin-top: 6rpx;">{{ data.cashBackDayBeginTime ? format(new Date(data.cashBackDayBeginTime), 'dd/MM/yyyy HH:mm') : '' }} - {{ data.cashBackDayEndTime ? format(new Date(data.cashBackDayEndTime), 'dd/MM/yyyy HH:mm') : '' }}</view>
          </view>
          <view class="rights_btn" :class="{'rights_btn_act': data.cashBackDayStatus === 2}" @click="submitReceive('vipReceiveCashBackDay')">{{ data.cashBackDayStatus === 3 ? $t('KEY_VIP_RECEIVED') : $t('KEY_VIP_RECEIVE') }}</view>
        </view>

        <view class="vip_rights_box">
          <image class="doubt" :style="{zIndex: doubt2 ? 3 : 1}" src="@/static/vip/newVip/doubt.png" alt="" @click="showMaskModal('doubt2')" />
          <view class="doubt_box" v-show="doubt2">
            <view class="doubt_title">{{ $t('KEY_VIP_WEEKLY_CASHBACK_RULES') }}</view>
            <view class="doubt_text">
              {{ $t('KEY_VIP_WEEKLY_CASHBACK_RULES1') }}
              <br />
              {{ $t('KEY_VIP_WEEKLY_CASHBACK_RULES2') }}
              <br />
              {{ $t('KEY_VIP_WEEKLY_CASHBACK_RULES3') }}
              <br />
              {{ $t('KEY_VIP_WEEKLY_CASHBACK_RULES4') }}
            </view>
          </view>
          <view class="rights_title">
            {{ $t('KEY_VIP_WEEKLY_CASHBACK') }}
            <text class="rights_title_num"> {{ _.floor((data.cashBackWeekRate || 0) * 100, 2) }}%</text>
            <text class="rights_title_max"> (MAX:{{ _.floor((data.cashBackWeekMaxRate || 0) * 100, 2) }}%)</text>
          </view>
          <view class="rights_tips">{{ $t('KEY_VIP_TIPS2') }}</view>
          <view class="rights_gold">
            <view class="gold_box">
              <Spine
                v-if="_.floor(data.cashBackWeekReciveAmount || 0, 2)"
                id="vip_jinbidui2"
                class="spine_vip"
                :skelName="'vip_jinbidui'"
                :assetsUrl="`./static/spinspine/index/vip_spine/`"
                animName="animation"
              ></Spine>
              <image v-else class="gold_img" src="@/static/vip/newVip/gold.png" alt="" />
            </view>
            <view class="gold">R$ {{ numberWithCommas(_.floor(data.cashBackWeekReciveAmount || 0, 2)) }}</view>
          </view>
          <view class="rights_title">{{ $t('KEY_VIP_LAST_WEEK_BONUS') }}</view>
          <view class="rights_tips">
            {{ $t('KEY_VIP_CLAIM_PERIOD') }}
            <view style="margin-top: 6rpx;">{{ data.cashBackWeekBeginTime ? format(new Date(data.cashBackWeekBeginTime), 'dd/MM/yyyy HH:mm') : '' }} - {{ data.cashBackWeekEndTime ? format(new Date(data.cashBackWeekEndTime), 'dd/MM/yyyy HH:mm') : '' }}</view>
          </view>
          <view class="rights_btn" :class="{'rights_btn_act': data.cashBackWeekStatus === 2}" @click="submitReceive('vipReceiveCashBackWeek')">{{ data.cashBackDayStatus === 3 ? $t('KEY_VIP_RECEIVED') : $t('KEY_VIP_RECEIVE') }}</view>
          <view class="line"></view>
          <view class="rights_title">{{ $t('KEY_VIP_BOUNS_ESTIMATE_NEXT_WEEK') }}</view>
          <view class="gold">R$ {{ numberWithCommas(_.floor(data.cashBackNextWeekReciveAmount || 0, 2)) }}</view>
          <view class="rights_tips">
            {{ $t('KEY_VIP_EFFECTIVE_PERIOD') }}
            <view style="margin-top: 6rpx;">{{ data.cashBackNextWeekBeginTime ? format(new Date(data.cashBackNextWeekBeginTime), 'dd/MM/yyyy HH:mm') : '' }} - {{ data.cashBackNextWeekEndTime ? format(new Date(data.cashBackNextWeekEndTime), 'dd/MM/yyyy HH:mm') : '' }}</view>
          </view>
        </view>
      </view>

      <!-- <view class="vip_footer">
        <view class="vip_footer_row">
          <view class="vip_footer_row_left">
            <image src="@/static/vip/newVip/footer_bonus.png" alt="" />
            <text>{{ $t('KEY_VIP_EXCHANGE_COUPONS') }}</text>
          </view>
          <view class="vip_footer_row_right">{{ $t('KEY_VIP_PROCEED') }}</view>
        </view>
        <view class="line"></view>
        <view class="vip_footer_row">
          <view class="vip_footer_row_left">
            <image src="@/static/vip/newVip/footer_bonus.png" alt="" />
            <text>{{ $t('KEY_VIP_DOWNLOAD_THE_APP') }}</text>
          </view>
          <view class="vip_footer_row_right">{{ $t('KEY_VIP_PROCEED') }}</view>
        </view>
      </view> -->
    </view>
  </Layout>
  <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
</template>

<script lang="ts" setup>
import light9 from "@/static/vip/newVip/9_light.jpg"
import light11 from "@/static/vip/newVip/11_light.jpg"
import light13 from "@/static/vip/newVip/13_light.jpg"
import Layout from '@/lib/layout/Base.vue'
import MaskModal from '@/lib/components/MaskModal/index.vue'
import Spine from '@/lib/components/Spine/Spine.vue'
import { api as lobbyApi } from '@/NET/lobby'
import { numberWithCommas } from '@/common/common'
import _ from 'lodash'
import { format } from 'date-fns'

const store = useUsersStore()
const commonStore = useCommonStore()
const { t: $t } = i18n.global

const ConfigItemsKey = {
  1: 'cashRate',
  2: 'cashBackDayRate',
  3: 'cashBackWeekRate',
  4: 'dayCashNumLimit',
  5: 'dayCashAmountLimit',
}

const ConfigItemsName = {
  1: $t('KEY_VIP_WITHDRAWAL_FEE'),
  2: $t('KEY_VIP_DAILY_CASHBACK'),
  3: $t('KEY_VIP_WEEKLY_CASHBACK'),
  4: $t('KEY_VIP_WITHDRAWAL_FREQUENCY'),
  5: $t('KEY_VIP_WITHDRAWAL_AMOUNT'),
}


const data = ref<any>({})
const vipList = ref([])

const defaultCurrent = ref(0)
const current = ref(0)

const RefModal = ref()

const doubt1 = ref(false)
const doubt2 = ref(false)

const vipReceiveCashBackDayLoading = ref(false)
const vipReceiveCashBackWeekLoading = ref(false)

function swiperChange(event) {
  current.value = event.detail.current
}

function showMaskModal(key) {
  if (key === 'doubt1') {
    doubt1.value = !doubt1.value
    RefModal.value.changeModal(doubt1)
  } else {
    doubt2.value = !doubt2.value
    RefModal.value.changeModal(doubt2)
  }
}

function maskClick() {
  doubt1.value = false
  doubt2.value = false
  RefModal.value.changeModal(false)
}

/* 跳转 */
function levelAdvance(item) {
  if (item.totalPayAmountPercent < 100 || (item.totalPayAmountPercent >= 100 && item.totalCashBetAmountPercent >= 100)) {
    commonStore.depositTab = 0
    uni.switchTab({ url: '/pages/deposit/index' })
  } else if (item.totalCashBetAmountPercent < 100) {
    uni.switchTab({ url: '/pages/index/index' })
  }
}

/* 领取 */
async function submitReceive(key: 'vipReceiveCashBackDay' | 'vipReceiveCashBackWeek') {
  if (key === 'vipReceiveCashBackDay' && vipReceiveCashBackDayLoading.value) return
  if (key === 'vipReceiveCashBackWeek' && vipReceiveCashBackWeekLoading.value) return
  try {
    let params = Object.assign({ userId: store.userInfo.userId }, store.commonParams)
    let res = null
    if (key === 'vipReceiveCashBackDay' && data.value.cashBackDayStatus === 2) {
      vipReceiveCashBackDayLoading.value = true
      res = await lobbyApi.vip.vipReceiveCashBackDay(params)
    }
    if (key === 'vipReceiveCashBackWeek' && data.value.cashBackWeekStatus === 2) {
      vipReceiveCashBackWeekLoading.value = true
      res = await lobbyApi.vip.vipReceiveCashBackWeek(params)
    }
    if (!res) {
      if (key === 'vipReceiveCashBackDay') vipReceiveCashBackDayLoading.value = false
      if (key === 'vipReceiveCashBackWeek') vipReceiveCashBackWeekLoading.value = false
      return
    }
    if (res.success) {
      getVipInfo()
      modal({
        width: '485rpx',
        title: $t('KEY_NEW_SHARE_SUS'),
        showCancel: false,
        showConfirm: false,
        maskClosable: true,
      })
    } else {
      ErrorHandler(res, key)
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (key === 'vipReceiveCashBackDay') vipReceiveCashBackDayLoading.value = false
    if (key === 'vipReceiveCashBackWeek') vipReceiveCashBackWeekLoading.value = false
  }
}

/* 获取用户vip相关信息 */
async function getVipInfo() {
  try {
    let params = Object.assign({ userId: store.userInfo.userId }, store.commonParams)
    let res = await lobbyApi.vip.vipGetVipUserInfo(params)
    if (res.success) {
      data.value = res.result || {}
      defaultCurrent.value = (res.result?.vip || 1) - 1
      current.value = (res.result?.vip || 1) - 1
      if ( res.result?.configItems?.length) {
        const list = res.result.configItems.sort((a, b) => a.vipGrade - b.vipGrade) // 保险排序一遍
        vipList.value = list.map((item, idx) => {
          let totalCashBetAmountPercent = 0
          let totalPayAmountPercent = 0
          let needCashBetAmount = 0
          let needPayAmount = 0
          if (idx + 1 < list.length) {
            totalCashBetAmountPercent = (data.value.totalCashBetAmount / list[idx + 1].needCashBetAmount) * 100
            totalPayAmountPercent =(data.value.totalPayAmount / list[idx + 1].needPayAmount) * 100
            needCashBetAmount = list[idx + 1].needCashBetAmount
            needPayAmount = list[idx + 1].needPayAmount
          }
          if (list.length === idx + 1) {
            totalCashBetAmountPercent = 0
            totalPayAmountPercent = 0
          }
          if (totalCashBetAmountPercent >= 100 || res.result.vip === list.length) {
            totalCashBetAmountPercent = 100
          }
          if (totalPayAmountPercent >= 100 || res.result.vip === list.length) {
            totalPayAmountPercent = 100
          }
          return {
            ...item,
            needCashBetAmount,
            needPayAmount,
            totalCashBetAmountPercent,
            totalPayAmountPercent,
          }
        })
      }
    } else {
      ErrorHandler(res, 'vipGetVipUserInfo')
    }
  } catch (error) {
    console.error(error);
  }
}

const initData = () => {

  if (store.userInfo?.userMode === 2) {
    getVipInfo()
  }
}

watch(
  () => store.userInfo,
  () => {
    initData()
  }
)

onMounted(() => {
  initData()
}),

uni.setNavigationBarTitle({
  title: $t('KEY_PAGETITLE_VIP'),
})
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
.vip_view {
  .vip_header {
    height: 625rpx;
    background: linear-gradient(0deg, #000000, #143522, #045331);
    position: relative;
    padding-top: 158rpx;
    .vip_header_bg {
      height: 625rpx;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
    .vip_header_bg_bg {
      height: 625rpx;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      &.vip_header_bg_bg0, &.vip_header_bg_bg1 {
        background: linear-gradient(0deg, #000000, #143522, #045331);
        background-size: 100% 100%;
      }
      &.vip_header_bg_bg2, &.vip_header_bg_bg3 {
        background: linear-gradient(0deg, #000000, #02182D, #004167);
        background-size: 100% 100%;
      }
      &.vip_header_bg_bg4, &.vip_header_bg_bg5 {
        background: linear-gradient(0deg, #000000, #511A10, #772509);
        background-size: 100% 100%;
      }
      &.vip_header_bg_bg6, &.vip_header_bg_bg7 {
        background: linear-gradient(0deg, #000000, #331849, #52286F);
        background-size: 100% 100%;
      }
    }
    .light {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 585rpx;
      height: 340rpx;
    }
    .vip_swiper {
      position: relative;
      height: 328rpx;
      z-index: 1;
      .vip_swiper_item {
        height: 328rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .vip_box {
          position: relative;
          width: 642rpx;
          height: 328rpx;
          padding: 26rpx 45rpx 42rpx 34rpx;
          transition: all 0.1s linear;
          color: #F0C977;
          &#vip_box1, &#vip_box2 {
            color: #397B4A !important;
            ::v-deep .uni-progress {
              .uni-progress-bar {
                background-color: rgba($color: #397B4A, $alpha: .4) !important;
                .uni-progress-inner-bar {
                  background-color: rgba($color: #397B4A, $alpha: 1) !important;
                }
              }
            }
            .box_header {
              .box_header_vip {
                background-image: linear-gradient(-31deg, #397B4A 29.9560546875%, #5FAF74 70.3125%);
              }
            }
            .vip_btn {
              color: #fff;
            }
          }
          &#vip_box3, &#vip_box4 {
            color: #5264C1 !important;
            ::v-deep .uni-progress {
              .uni-progress-bar {
                background-color: rgba($color: #3579AC, $alpha: .4) !important;
                .uni-progress-inner-bar {
                  background-color: rgba($color: #3579AC, $alpha: 1) !important;
                }
              }
            }
            .box_header {
              .box_header_vip {
                background-image: linear-gradient(-31deg, #4446A5 29.9560546875%, #5264C1 70.3125%);
              }
            }
            .vip_btn {
              color: #fff;
            }
          }
          &#vip_box5, &#vip_box6 {
            color: #B94F36 !important;
            ::v-deep .uni-progress {
              .uni-progress-bar {
                background-color: rgba($color: #B94F36, $alpha: .4) !important;
                .uni-progress-inner-bar {
                  background-color: rgba($color: #B94F36, $alpha: 1) !important;
                }
              }
            }
            .box_header {
              .box_header_vip {
                background-image: linear-gradient(-31deg, #BF482C 29.9560546875%, #DD6955 70.3125%);
              }
            }
            .vip_btn {
              color: #fff;
            }
          }
          &#vip_box7, &#vip_box8 {
            color: #903FAC !important;
            ::v-deep .uni-progress {
              .uni-progress-bar {
                background-color: rgba($color: #9643B0, $alpha: .4) !important;
                .uni-progress-inner-bar {
                  background-color: rgba($color: #9643B0, $alpha: 1) !important;
                }
              }
            }
            .box_header {
              .box_header_vip {
                background-image: linear-gradient(-31deg, #8939A6 29.9560546875%, #AB52C1 70.3125%);
              }
            }
            .vip_btn {
              color: #fff;
            }
          }
          &#vip_box9, &#vip_box10 {
            color: #826039 !important;
            ::v-deep .uni-progress {
              .uni-progress-bar {
                background-color: rgba($color: #99704F, $alpha: .4) !important;
                .uni-progress-inner-bar {
                  background-color: rgba($color: #99704F, $alpha: 1) !important;
                }
              }
            }
            .box_header {
              .box_header_vip {
                background-image: linear-gradient(-31deg, #8E5134 29.6875%, #AA8759 90.1123046875%);
              }
            }
            .vip_btn {
              color: #fff;
            }
          }
          &#vip_box11, &#vip_box12 {
            color: #B6BDDE !important;
            ::v-deep .uni-progress {
              .uni-progress-bar {
                background-color: rgba($color: #0B0C20, $alpha: .4) !important;
                .uni-progress-inner-bar {
                  background-color: rgba($color: #A2A2DD, $alpha: 1) !important;
                }
              }
            }
            .box_header {
              .box_header_vip {
                background-image: linear-gradient(-31deg, #D3E4F8 29.6875%, #FEFEFE 90.1123046875%);
              }
            }
            .vip_btn {
              color: #fff;
            }
          }
          .vip_start {
            position: absolute;
            width: 19rpx;
            height: 20rpx;
            right: 138rpx;
            bottom: 110rpx;
            &.vip_start_small {
              width: 9rpx;
              right: 144rpx;
            }
          }
          .box_header {
            height: 52rpx;
            position: relative;
            .vip13 {
              position: absolute;
              bottom: -12rpx;
              left: 16rpx;
              width: 33rpx;
              height: 44rpx;
            }
            .box_header_vip {
              font-family: 'Eras Bold ITC';
              font-size: 70rpx;
              font-weight: 900;
              font-style: italic;
              padding-right: 10rpx;
              background-image: linear-gradient(-31deg, #F8F6FC 29.9560546875%, #FCEAC7 70.3125%);
              color: transparent;
              -webkit-background-clip: text;
              letter-spacing: -2rpx;
              margin-left: -10rpx;
            }
            .current_tag {
              position: relative;
              bottom: 10rpx;
              display: inline-block;
              height: 35rpx;
              padding: 0 24rpx;
              background: #191919;
              border-radius: 31rpx 4rpx 29rpx 4rpx;
              opacity: 0.84;
              font-size: 24rpx;
              color: #FAE8A9;
              font-family: 'Agency FB';
              font-style: italic;
              line-height: 35rpx;
              &.current_tag_small {
                bottom: 6rpx;
                height: 28rpx;
                font-size: 19rpx;
                padding: 0 18rpx;
                line-height: 30rpx;
              }
            }
          }
          .vip_main {
            display: flex;
            align-items: flex-end;
            margin-top: 80rpx;
            .vip_main_info {
              width: 314rpx;
              .vip_lv {
                display: flex;
                align-items: center;
                justify-content: space-between;
                text {
                  font-weight: 600;
                  font-size: 26rpx;
                }
              }
              .vip_progress {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 5rpx;
                margin-top: 16rpx;
                &.vip_progress_top {
                  margin-top: 12rpx;
                }
                text {
                  font-family: Arial;
                  font-size: 21rpx;
                }
              }
              ::v-deep .uni-progress {
                width: 314rpx;
                height: 10rpx;
                .uni-progress-bar {
                  border-radius: 3rpx;
                  background-color: rgba($color: #0D0C0C, $alpha: .4) !important;
                  height: 10rpx !important;
                  .uni-progress-inner-bar {
                    height: 10rpx;
                    background-color: rgba($color: #F0C977, $alpha: 1) !important;
                    border-radius: 3rpx;
                  }
                }
              }
            }
            .vip_btn {
              width: 205rpx;
              height: 51rpx;
              font-family: Arial;
              font-size: 22rpx;
              color: #4E3B08;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 44rpx;
            }
          }
        }
      }
    }
    .vip_schedule {
      margin-top: 76rpx;
      background: url('@/static/vip/newVip/vip_schedule.png') no-repeat;
      background-size: 100% 100%;
      height: 52rpx;
      width: 100%;
      font-family: Arial;
      font-size: 25rpx;
      color: #868686;
      position: relative;
      text-align: center;
      .current_v {
        font-size: 29rpx;
        color: #FFFFFF;
        position: absolute;
        top: -54rpx;
        left: 50%;
        transform: translateX(-50%);
        .schedule_img {
          width: 44rpx;
          height: 44rpx;
          margin-top: 0rpx;
        }
      }
      .prev_v {
        left: 110rpx;
      }
      .next_v {
        right: 110rpx;
      }
      .other_v {
        position: absolute;
        bottom: 20rpx;
      }
      .schedule_img {
        width: 14rpx;
        height: 14rpx;
        margin-top: 10rpx;
      }
    }
  }
  .vip_title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial;
    font-size: 35rpx;
    color: #F3C861;
    height: 40rpx;
    text {
      margin: 0 8rpx;
    }
    image {
      width: 24rpx;
      height: 40rpx;
    }
  }
  .vip_privileges {
    margin-top: 11rpx;
    padding: 21rpx 24rpx 0 24rpx;
    background: #000;
    position: relative;
    z-index: 2;
    margin-top: -1rpx;
    .vip_grid_box {
      margin-top: 22rpx;
      display: grid;
      grid-gap: 15rpx;
      grid-template-columns: 1fr 1fr 1fr;
      .vip_grid_item {
        width: 224rpx;
        height: 263rpx;
        text-align: center;
        padding: 33rpx 10rpx;
        border: 3rpx solid transparent;
        border-radius: 11rpx;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(180deg, #272727, #1B1B1B), linear-gradient(360deg, #212121, #313131);
        image {
          width: 90rpx;
          height: 90rpx;
        }
        .vip_grid_num {
          font-weight: 600;
          font-size: 42rpx;
          color: #FFB900;
          margin: 10rpx 0 6rpx;
        }
        .vip_grid_tips {
          font-family: Arial;
          font-size: 24rpx;
          color: #E1E1E1;
          letter-spacing: 0.5rpx;
        }
      }
    }
  }
  .vip_rights {
    margin-top: 28rpx;
    padding: 0 24rpx;
    .vip_rights_box {
      background: #1B1C1C;
      border-radius: 11px;
      padding: 49rpx 33rpx 30rpx;
      margin-bottom: 42rpx;
      margin-top: 22rpx;
      position: relative;
      overflow: hidden;
      .doubt {
        position: absolute;
        top: 12rpx;
        right: 12rpx;
        width: 38rpx;
        height: 38rpx;
      }
      .doubt_box {
        position: absolute;
        z-index: 99;
        top: 70rpx;
        left: 50%;
        transform: translate(-50%);
        width: 100%;
        padding: 1.09375rem 1.4375rem 2.5rem;
        box-sizing: border-box;
        background: #e9e9e9;
        border-radius: .4375rem;
        color: #121213;
        &::before {
          position: absolute;
          right: 16rpx;
          top: -12rpx;
          content: "";
          display: block;
          width: 1rem;
          height: .375rem;
          background: url(data:image/webp;base64,UklGRuYAAABXRUJQVlA4WAoAAAAQAAAALAAAEQAAQUxQSIYAAAABX6CkjSQ4u/cLWHTsBCy7iAg0T2+a5cBpbdtSw1TA7HFYJDg0LaBoAUsZSCwOT4ZTXvLveyVE9F9AUOSBGZGoHyJf1525rLDEDu0L6BwOgDM1TV9+zZb84b/GsBHYE6n/EDbqVQhy2opsidUqXSdWGc40XGXEHKyya/QqUNP0KuS0C5c7A1ZQOCA6AAAAcAMAnQEqLQASAD6RQJtJJaOioSqoALASCWkAAFGROlY0AO4AAP7vuP/+2H//tdj//tXRn/T3AAAAAA==);
          background-size: cover;
        }
        .doubt_title {
          font-weight: 700;
          font-size: 1.03125rem;
          color: #121213;
          text-align: center;
          margin-bottom: 1.1875rem;
        }
        .doubt_text {
          font-size: .6875rem;
          line-height: 1rem;
          font-weight: 400;
        }
      }
      .rights_title {
        font-family: Arial;
        font-size: 31rpx;
        color: #E1E1E1;
        margin-bottom: 12rpx;
        .rights_title_num {
          color: #FFB900;
        }
        .rights_title_max {
          color: #8D8C8C;
        }
      }
      .rights_tips {
        font-family: Arial;
        font-size: 25rpx;
        color: #727272;
      }
      .rights_gold {
        text-align: center;
        margin-bottom: 40rpx;
        min-height: 326rpx;
        position: relative;
        .gold_box {
          margin-top: -67rpx;
          position: relative;
          height: 326rpx;
        }
        .gold_img {
          width: 476rpx;
          height: 326rpx;
        }
        .spine_vip {
          position: absolute;
          top: -200rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 976rpx;
          height: 826rpx;
          // width: 476rpx;
          // height: 326rpx;
        }
      }
      .gold {
        font-size: 42rpx;
        color: #FFB900;
        padding-top: 17rpx;
        text-align: center;
        margin-bottom: 12rpx;
      }
      .rights_btn {
        width: 100%;
        height: 90rpx;
        background: rgb(101, 101, 101);
        color: rgb(188, 188, 188);
        border-radius: 14rpx;
        font-family: Arial;
        font-size: 36rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 34rpx;
        position: relative;
        &.rights_btn_act {
          color: #FFFFFF;
          background: #F92F49;
        }
      }
    }
  }
  .line {
    height: 1rpx;
    background: #454545;
    border-radius: 1rpx;
    margin: 28rpx 0;
  }
  .vip_footer {
    margin: 0 24rpx 42rpx;
    background: #1B1C1C;
    border-radius: 11px;
    padding: 26rpx 33rpx;
    .vip_footer_row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: Arial;
      .vip_footer_row_left {
        font-size: 31rpx;
        color: #E1E1E1;
        display: flex;
        align-items: center;
        image {
          width: 86rpx;
          height: 79rpx;
          margin-right: 19rpx;
        }
      }
      .vip_footer_row_right {
        width: 159rpx;
        height: 63rpx;
        background: #F92F49;
        border-radius: 31rpx;
        font-size: 29rpx;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
<style lang="scss">
.modal-view {
  z-index: 2;
}
</style>
