<template>
  <view class="activity_view h-full">
    <view class="act_top flex items-end">
      <view class="flex flex-1 items-center">
        <view class="flex-1 text-center" v-for="item in shareList" :key="item.name" @click="openApp(item)">
          <image
            style="width: 106rpx; height: 106rpx;"
            :src="item.icon"
            mode="scaleToFill"
          />
          <view class="share_name">{{ item.name }}</view>
        </view>
      </view>
    </view>

    <view class="act_info">
      <view class="act_copy flex justify-between items-center">
        <input class="copy_input" type="text" disabled :value="shareUrl">
        <view ref="RefcopyBtn" class="copy_btn flex justify-center items-center" @click="copy">{{ $t('KEY_COMMON_COPY') }}</view>
      </view>

      <view class="act_detail text-center">
        <view class="detail_t flex items-center justify-center">
          <view class="detail_t_l">{{ $t('KEY_BONUS_RECEIVED') }}:<text>R$ {{ totalBonus }}</text></view>
          <view class="detail_t_r">{{ $t('KEY_INVITED_PLAYERS') }}:<text>{{ totalValidUser }}</text></view>
        </view>
        <view class="detail_b">{{ $t('KEY_BONUS_AVAILABLE') }}:<text>R$ {{ amountToWithdraw }}</text></view>
      </view>

      <view
        class="act_goto flex items-center justify-center"
        :class="{'disabled': !amountToWithdraw}"
        :style="{'font-size': languageStore.local.id === 'en' ? '40rpx' : '50rpx'}"
        @click="submit"
      >
        {{ $t('KEY_DIRECT_WITHDRAWAL') }}
      </view>
    </view>

    <view class="act_progress">
      <view class="progress_box">
        <view class="my_progress flex items-center">
          <view class="move">
            <view class="move_lv" :style="{'left': pgValue + '%', 'transition-duration': (10 * pgValue / 1000) + 's'}">
              <text class="z-10">{{ `Lv${userLv}` }}</text>
              <view></view>
            </view>
            <progress :percent="pgValue" active :duration="10" />
          </view>
          <text class="progress_lv">{{ isMaxLevel  ? 'Max' : `Lv${userLv + 1}` }}</text>
          <text v-if="!isMaxLevel" class="progress_tips">{{ $t('KEY_ACTIVITY_SHARE_UPDATE', {num: reValidUser ?? 1}) }}</text>
        </view>
      </view>

      <!-- <view class="tips">
        {{ 'Cada pessoa convidada pode retirar diretamente' }}
        <text>{{ 'R$ 10' }}</text>
        {{ 'para PIX' }}
      </view> -->

      <view  class="act_treasure">
        <scroll-view
          v-if="lvList.length"
          class="scroll_view"
          :scroll-x="true"
          :scroll-with-animation="true"
          :scroll-left="scrollLeft"
          :show-scrollbar="false"
          @scroll="scroll"
        >
          <view
            v-for="(item, idx) in lvList"
            :key="idx"
            class="scroll_view_item"
            :class="{
              'scroll_view_item_big': item.isBig,
              'scroll_view_item_pr0': lvList[idx + 1]?.isBig,'scroll_view_item_pl0': lvList[idx - 1]?.isBig,
              'scroll_view_item_first': idx === 0,
              'scroll_view_item_last': idx === lvList.length - 1,
              'scroll_view_item_big_first': item.isBig && idx === 0,
              'scroll_view_item_big_last': item.isBig && idx === lvList.length - 1,
            }"
            @click="changeMenu(idx, true, item.isBig)"
          >
            <view
              v-if="!item.isBig"
              class="swiper_box"
              :class="item.isRecived ? 'open' : 'close'"
            >
              <image :src="item.isRecived ? activity5_open : activity5_close" mode="scaleToFill" />
              <view class="swiper_box_t">{{ item.text }}</view>
            </view>
            <view class="spine_box" v-else>
              <Spine
                  ref="RefSpineBaoXiang"
                  id="share_spine_baoxiang"
                  class="spine_player"
                  :skelName="'fenxiang_baoxiang'"
                  :assetsUrl="`./static/spinspine/index/activity/`"
                  animName="animation"
              ></Spine>
              <view class="spine_box_t">{{ item.text }}</view>
            </view>
          </view>
        </scroll-view>
        <Spine
            ref="RefSpineLeft"
            id="arrow_left"
            class="spine_arrow left"
            :skelName="'fenxiang_jiantou'"
            :assetsUrl="`./static/spinspine/index/activity/`"
            animName="animation"
            @click="changeMenu(0)"
        ></Spine>
        <Spine
            ref="RefSpineRight"
            id="arrow_right"
            class="spine_arrow right"
            :skelName="'fenxiang_jiantou'"
            :assetsUrl="`./static/spinspine/index/activity/`"
            animName="animation"
            @click="changeMenu(lvList.length - 1)"
        ></Spine>
      </view>
    </view>

    <view class="act_table">
      <view class="table_title">{{ $t('KEY_PROGRESS_LEVEL').toLocaleUpperCase() }}</view>
      <view class="table">
        <view class="table_header">
          <view>{{ $t('KEY_AGENT_LEVEL') }}</view>
          <view>{{ $t('KEY_NUMBER_OF_INVITEES') }}</view>
          <view>{{ $t('KEY_TREASURE_CHEST_BONUS') }}</view>
        </view>
        <view class="table_row_box">
          <view class="table_row" v-for="(item, idx) in progresso" :key="idx">
            <view>Lv.{{ item.level ?? 1 }}</view>
            <view>{{ item.validQuantityMin ?? 0 }}-{{ item.validQuantityMax ?? 0 }}</view>
            <view>R$ {{ item.bonus ?? 0 }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="act_table last">
      <view class="table_title">{{ $t('KEY_AWARD_RECORD').toLocaleUpperCase() }}</view>
      <view class="table">
        <view class="table_header">
          <view>{{ $t('KEY_USER') }}</view>
          <view>{{ $t('KEY_SHARE_BOUNS') }}</view>
          <view>{{ $t('KEY_TIME') }}</view>
        </view>
        <view class="table_row_box">
          <view class="table_row" v-for="(item, idx) in recorde" :key="idx">
            <view>{{ item.userName ?? '' }}</view>
            <view>R$ {{ item.bonus ?? 0 }}</view>
            <view>{{ item.recDate ? format(new Date(item.recDate), 'yyyy-MM-dd HH:mm') : '' }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="act_pagination">
      <image
        :class="!prevDisable && 'arrow_disable_left'"
        :src="prevDisable ? activity5_arrow_left_black : activity5_arrow_right_white"
        mode="scaleToFill"
        @click="getRewardRecord('prev')"
      />
      <text>{{ pageIndex }}</text>
      <image
        :class="nextDisable && 'arrow_disable_right'"
        :src="nextDisable ? activity5_arrow_left_black : activity5_arrow_right_white"
        mode="scaleToFill"
        @click="getRewardRecord('next')"
      />
    </view>

    <view class="act_regra">
      <view class="regra_title">{{ $t('KEY_NEW_SHARE_RULE_TITLE').toLocaleUpperCase() }}</view>
      <view class="regra_t" v-for="(item, idx) in regra" :key="idx">
        <view class="regra_t_l">{{ idx === regra.length - 1 ? '' : idx + 1 }}</view>
        <view class="regra_t_r">{{ item }}</view>
      </view>
    </view>
    <view class="act_space"></view>
    <view v-show="showSuspension" class="suspension act_goto flex items-center justify-center" :class="{'show_suspension': showSuspension >= 300}" @click="suspensionFn">{{ $t('KEY_NEW_SHARE_SUSPENSION') }}</view>
    <PopupBottom ref="RefPopupCard" :height="720">
      <view class="personal-title">
          {{ $t('KEY_PAGETITLE_ADDCARD') }}
      </view>
      <CardInfo
          class="cardInfo"
          @confirm="cardConfirm"
          :page-type="1"
          :dark="false"
          :noCashLoad="true"
      />
    </PopupBottom>
    <PopupBottom ref="RefPopupWithdraw" :height="800" background="'rgb(14,14,15)'">
      <view class="personal-title">
          <!-- {{ $t('KEY_PAGETITLE_ADDCARD') }} -->
      </view>
      <ActivityWithdraw
        :amountToWithdraw="amountToWithdraw"
        :refresh="refresh"
        @refreshData="loadData"
      />
    </PopupBottom>
    <PopupBottom ref="RefPopupCopy" :height="480" background="'rgb(14,14,15)'">
      <view class="personal-title"></view>
      <view class="popupTitle">{{ $t('KEY_NEW_SHARE_SUSPENSION_TIPS') }}<text> R$ {{ progresso?.at(-1)?.bonus ?? 0 }}</text></view>
      <view class="popupShare">
        <view class="flex flex-1 items-center">
          <view class="flex-1 text-center" v-for="item in shareList" :key="item.name" @click="openApp(item)">
            <image
              style="width: 106rpx; height: 106rpx;"
              :src="item.icon"
              mode="scaleToFill"
            />
            <view class="share_name">{{ item.name }}</view>
          </view>
        </view>
      </view>
      <view class="popupCopy">
        <view class="act_copy flex justify-between items-center">
          <input class="copy_input" type="text" disabled :value="shareUrl">
          <view ref="RefcopyBtn" class="copy_btn flex justify-center items-center" @click="copy">{{ $t('KEY_COMMON_COPY') }}</view>
        </view>
      </view>
    </PopupBottom>
  </view>
</template>

<script lang="ts" setup>
import fb from "@/static/activity/share/fb.png"
import tg from "@/static/activity/share/tg.png"
import tx from "@/static/activity/share/tx.png"
import wa from "@/static/activity/share/wa.png"
import activity5_close from "@/static/activity/share/activity5_close.png"
import activity5_open from "@/static/activity/share/activity5_open.png"
import activity5_arrow_left_black from "@/static/activity/share/activity5_arrow_left_black.png";
import activity5_arrow_right_white from "@/static/activity/share/activity5_arrow_right_white.png";
import { api as lobbyApi } from '@/NET/lobby'
import { api as commonApi } from '@/NET/common'
import { InviteUser102001BoxsItem, PromoteUserDto } from '@/NET/lobby/data-contracts'
import Spine from '@/lib/components/Spine/Spine.vue'
import PopupBottom from '@/lib/components/PopupBottom/index.vue'
import CardInfo from '@/lib/components/CardInfo/index.vue'
import ActivityWithdraw from './components/activityWithdraw.vue'
import { format } from 'date-fns'
import ClipboardJS from 'clipboard'

interface Props {
  scrollTop?: number
}
const props = withDefaults(defineProps<Props>(), {
  scrollTop: 0,
})

const store = useUsersStore()
const languageStore = i18nStore()
const { t: $t } = i18n.global

const regra = [
  $t('KEY_NEW_SHARE_RULE_SPLIT_1'),
  $t('KEY_NEW_SHARE_RULE_SPLIT_2'),
  $t('KEY_NEW_SHARE_RULE_SPLIT_3'),
  $t('KEY_NEW_SHARE_RULE_SPLIT_4'),
]

const shareList = ref([
  { id: 3, name: 'Facebook', icon: fb },
  { id: 2, name: 'Whatsapp', icon: wa },
  { id: 1, name: 'Telegram', icon: tg },
  { id: 4, name: 'Twitter', icon: tx },
])

const RefPopupCard = ref()
const RefPopupWithdraw = ref()
const RefPopupCopy = ref()
const RefcopyBtn = ref()
const RefSpineBaoXiang = ref()
const RefSpineLeft = ref()
const RefSpineRight = ref()

const refresh = ref(false)

const promoteUser = ref<PromoteUserDto>({})

const progresso = ref([])
const recorde = ref([])
const lvList = ref([])
const showSuspension = ref<any>(false)

const userLv = ref(1) // 当前邀请等级
const pgValue = ref(0) // 当前邀请进度
const shareUrl = ref('')
const totalBonus = ref(0) // 总领取金额
const totalValidUser = ref(0) // 已邀请有效人数
const amountToWithdraw = ref(0) // 待提现金额
const reValidUser = ref(1) // 当前邀请等级差几人升级
const hasUserBank = ref(false) // 是否有银行卡
const pageSize = ref(5)
const pageIndex = ref(1)
const prevDisable = ref(true)
const nextDisable = ref(false)
const isMaxLevel = ref(false) // 最大等级，满进度条

const contentScrollW = ref(0) // 导航区宽度
const curIndex = ref(0) // 当前选中
const scrollLeft = ref(0) // 横向滚动条位置
const defaultScrollLeft = ref(0) // 横向滚动条位置
const currentBigIdx = ref(0)

function scroll(even: any) {
  scrollLeft.value = even.detail.scrollLeft
}

function changeMenu(idx: number, isCopy?: boolean, isBig?: boolean) {
  if (idx === currentBigIdx.value - 1 && isCopy && isBig) {
    // RefcopyBtn.value?.$el?.click()
    RefPopupCopy?.value?.changeIsShow(true)
  }
  if (idx < 0 || idx >= lvList.value.length) return
  // 初始位置 大于 滚动位置，并且点击右箭头 || 初始位置 小于 滚动位置，并且点击左箭头
  const isToDefault = (defaultScrollLeft.value > scrollLeft.value && idx === lvList.value.length - 1) || (defaultScrollLeft.value < scrollLeft.value && idx === 0)
  if (isToDefault) {
    curIndex.value = currentBigIdx.value - 1
  } else {
    curIndex.value = idx
  }
  scrollLeft.value = Math.floor(lvList.value[curIndex.value].left - contentScrollW.value / 2 + lvList.value[curIndex.value].width / 2)
  return scrollLeft.value
}

// 获取标题区域宽度，和每个子元素节点的宽度以及元素距离左边栏的距离
function getScrollW() {
  let query = uni.createSelectorQuery();
  query.select('.scroll_view').boundingClientRect((data: any) => {
    // 拿到 scroll-view 组件宽度
    contentScrollW.value = data.width
  }).exec();

  query.selectAll('.scroll_view_item').boundingClientRect((data: any) => {
    let dataLen = data.length;
    const defaultLeft =  data[0].left
    for (let i = 0; i < dataLen; i++) {
      //  scroll-view 子元素组件距离左边栏的距离
      lvList.value[i].left = data[i].left - defaultLeft
      //  scroll-view 子元素组件宽度
      lvList.value[i].width = data[i].width
    }
  }).exec()
  defaultScrollLeft.value = changeMenu(currentBigIdx.value - 1)
}

function copy() {
  const clipboard = new ClipboardJS('.copy_btn', {
    text: () => shareUrl.value
  })
  clipboard.on('success', function () {
    modal({
      width: '485rpx',
      title: $t('KEY_ACTIVITY_SHARE_COPYSUCCESS'),
      showCancel: false,
      showConfirm: false,
      maskClosable: true,
    })
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboard.destroy()
  })
  // clipboard.onClick('.copy_btn')
  // uni.setClipboardData({
  //   data: shareUrl.value,
  //   showToast: false,
  //   success: function () {
  //     modal({
  //       width: '485rpx',
  //       title: $t('KEY_ACTIVITY_SHARE_COPYSUCCESS'),
  //       showCancel: false,
  //       showConfirm: false,
  //       maskClosable: true,
  //     })
  //   },
  // })
}

/* 点击提现 */
function submit() {
  if (!amountToWithdraw.value) {
    return modal({
      type: 'warning',
      width: '500rpx',
      title: $t('KEY_POPUP_TIPS'),
      content: $t('KEY_NO_BONUS'),
      confirmText: 'OK',
      showCancel: false,
    })
  } else {
    if (hasUserBank.value) {
      openPopWithdraw(true)
    } else {
      openPopCard(true)
    }
  }
}

function openApp(item) {
  const paramsUrl = encodeURIComponent(shareUrl.value)
  let url = ''
  switch (item.name) {
    case 'Telegram':
      url = `https://t.me/share/url?url=${paramsUrl}`
      break
    case 'Whatsapp':
      url = `https://wa.me/?text=${paramsUrl}`
      break
    case 'Facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${paramsUrl}`
      break
    case 'Twitter':
      url = `https://x.com/intent/post?&url=${paramsUrl}`
      break
    default:
      url = `https://t.me/share/url?url=${paramsUrl}`
      break
  }
  // @ts-ignore
  if (window.android) {
    // @ts-ignore
    window.android.ShareChannel(url)
  } else {
    window.open(url)
  }
}

const getPromoteUser = async () => {
    if (store.userInfo?.userMode !== 2) {
        return
    }
    const res = await commonApi.promote.promoteUserInfoCreate()
    if (res.success) {
        promoteUser.value = res.result ?? {}
    } else {
        ErrorHandler(res, 'getPromoteUser')
    }
    if (store.userInfo) {
      shareUrl.value = `${location.origin}${location.pathname}#/pages/agent/invite?uid=${promoteUser.value.pUrl ?? ''}`
      loadData()
      getRewardRecord()
    }
}

const payFaildOk = () => {
    uni.navigateTo({
        url: `../../pages/login/index?login_mode=2`,
    })
}
const payFaildCancel = () => {
    uni.navigateTo({
        url: `../../pages/register/index?login_mode=2`,
    })
}

const modalRef = ref(null)
const openGuestModal = () => {
  modalRef.value = modal({
      width: '485rpx',
      type: 'guest',
      zIndex: 29,
      title: $t('KEY_PAY_POPMESSAGE2'),
      content: $t('KEY_PAY_POPMESSAGE3'),
      confirmText: $t('KEY_FORMBTN_LOGIN'),
      cancelText: $t('KEY_FORMBTN_REGISTER'),
      maskClosable: false,
      onConfirm() {
          payFaildOk()
      },
      onCancel() {
          payFaildCancel()
      },
  })
}

const initData = async () => {
  getPromoteUser()
  if (store.userInfo?.userMode === 1) {
      nextTick(() => {
          openGuestModal()
      })
  }
}

async function getRewardRecord(type?: 'prev' | 'next') {
  if ((prevDisable.value && type === 'prev') || (nextDisable.value && type === 'next')) return
  try {
    const pages = type === 'prev' ? -1 : type === 'next' ? 1 : 0
    const params = Object.assign(
      {
        userId: store.userInfo.userId,
        pageSize: pageSize.value,
        pageIndex: pageIndex.value + pages
      },
      store.commonParams
    )
    const res = await lobbyApi.inviteNewuser.getRewardRecord(params, {cancelToken: 'lobbyApi.inviteNewuser.getRewardRecord'})
    if (res.success) {
      if (res?.result.length) {
        pageIndex.value += pages
      }
      if (res?.result.length < 5) {
        nextDisable.value = true
      } else {
        nextDisable.value = false
      }
      if (pageIndex.value === 1) {
        prevDisable.value = true
      } else {
        prevDisable.value = false
      }
      if (res?.result?.length) {
        recorde.value = res?.result ?? []
      }
    } else {
      ErrorHandler(res, 'getRewardRecord')
    }
  } catch (error) {
    console.error(error);
  }
}

/* 加载活动数据 */
async function loadData() {
  openPopWithdraw(false)
  try {
    scrollLeft.value = 0
    defaultScrollLeft.value = 0
    lvList.value = []
    const params = Object.assign(
      { userId: store.userInfo.userId },
      store.commonParams
    )
    const res = await lobbyApi.inviteNewuser.loadData(params)
    if (res.success) {
      const result = res.result
      userLv.value = result?.level ?? 1 // 当前邀请等级
      reValidUser.value = result.reValidUser ?? 1
      pgValue.value = ((result.needValidUser - result.reValidUser) / result.needValidUser) * 100 // 计算邀请人数进度条
      totalBonus.value = result?.totalBonus ?? 0 // 总领取金额
      totalValidUser.value = result?.totalValidUser ?? 0 // 已邀请有效人数
      amountToWithdraw.value = result?.amountToWithdraw ?? 0 // 待提现金额
      progresso.value = result?.configItems ?? []
      hasUserBank.value = result?.hasUserBank ?? false
      let isBig = false
      let bigType = false
      lvList.value = result?.boxsItems?.map((item: InviteUser102001BoxsItem, idx: number) => {
        if (!isBig) {
          isBig = !item.isRecived
          bigType = true
        }
        else bigType = false
        if (bigType && isBig) currentBigIdx.value = idx + 1
        return {
          lv: item.orderNum,
          text: `R$${item.bonus}`,
          letf: 0,
          width: 0,
          isRecived: item.isRecived,
          isBig: bigType ? isBig : false,
        }
      }) ?? []
      if (currentBigIdx.value === 0) {
        currentBigIdx.value = lvList.value.length
      }
      isMaxLevel.value = false
      if (progresso.value.at(-1)) {
        const obj = progresso.value.at(-1)
        if (userLv.value === obj?.level && reValidUser.value === 0) {
          isMaxLevel.value = true
          pgValue.value = 100
        }
      }
      nextTick(() => {
        getScrollW()
      })
    } else {
      ErrorHandler(res, 'loadData')
    }
  } catch (error) {
    console.error(error);
  }
}

function suspensionFn() {
  if (showSuspension.value >= 300) {
    RefPopupCopy?.value?.changeIsShow(true)
  }
}

const openPopCard = (type) => {
  RefPopupCard?.value?.changeIsShow(type)
}

const openPopWithdraw = (type) => {
  RefPopupWithdraw?.value?.changeIsShow(type)
}

const cardConfirm = () => {
  hasUserBank.value = true
  refresh.value = true
  openPopCard(false)
  openPopWithdraw(true)
}

watch(
  () => store.userInfo,
  () => {
    initData()
  }
)

watch(() => props.scrollTop, (e) =>{
  if (e > 100 && e <= 300) {
    showSuspension.value = true
  } else if (e > 300) {
    showSuspension.value = e
  } else {
    showSuspension.value = false
  }
})

onShow(() => {
  RefSpineBaoXiang.value?.[0]?.dispose()
  initData()
})

onHide(() => {
  modalRef.value && modalRef.value?.close()
})

onBeforeUnmount(() => {
  RefSpineBaoXiang.value?.[0]?.dispose()
  RefSpineLeft.value?.dispose()
  RefSpineRight.value?.dispose()
  modalRef.value && modalRef.value?.close()
})

// onMounted(() => {
//   getPromoteUser()
// })

</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
.activity_view {
  position: relative;
  .act_top {
    background: url('@/static/activity/share/activity5_bg.png') no-repeat;
    background-size: 100%;
    width: 100%;
    height: 494rpx;
    padding: 0 63rpx 20rpx;
  }
  .act_info {
    padding: 0 31rpx;
    .act_detail {
      margin-top: 24rpx;
      border-radius: 11rpx;
      .detail_t {
        margin-bottom: 3rpx;
        view {
          padding-left: 17rpx;
          background: #242424;
          width: 343rpx;
          height: 53rpx;
          text-align: left;
          color: #959595;
          font-size: 25rpx;
          display: flex;
          align-items: center;
          text {
            font-size: 33rpx;
            color: #FFFFFF;
            margin-left: 12rpx;
          }
        }
        .detail_t_l {
          margin-right: 3rpx;
          border-radius: 11rpx 0px 0px 0px;
        }
        .detail_t_r {
          border-radius: 0px 11rpx 0px 0px;
        }
      }
      .detail_b {
        background: #242424;
        width: 100%;
        height: 53rpx;
        font-size: 33rpx;
        color: #FFB900;
        border-radius: 0px 0px 11rpx 11rpx;
        line-height: 53rpx;
        text {
          margin-left: 12rpx;
        }
      }
    }
  }
  .act_progress {
    .progress_box {
      padding-left: 60rpx;
      .my_progress {
        padding-top: 65rpx;
        position: relative;
        .move {
          position: relative;
        }
        ::v-deep .uni-progress {
          width: 553rpx;
          height: 39rpx;
          .uni-progress-bar {
            border-radius: 25rpx;
            border: 5rpx solid #982320;
            background-color: #520B0C !important;
            height: 39rpx !important;
            .uni-progress-inner-bar {
              height: 39rpx;
              background: linear-gradient(270deg, #FFF6D9, #FCE231 30%);
              border-radius: 25rpx;
            }
          }
        }
        .progress_lv {
          font-size: 36rpx;
          color: #FFEE88;
          margin-left: 11rpx;
          font-weight: 900;
        }
        .progress_tips {
          position: absolute;
          font-size: 25rpx;
          color: #F35212;
          left: 90rpx;
        }
        .move_lv {
          display: flex;
          align-items: center;
          justify-content: center;
          // width: 79rpx;
          padding: 0 16rpx;
          height: 42rpx;
          background: #FFEE88;
          border-radius: 21rpx;
          font-size: 28rpx;
          color: #943F28;
          position: absolute;
          top: -57rpx;
          left: 0;
          transform: translateX(-50%);
          transition: all 0.3s linear;
          font-weight: 900;
          view {
            width: 0;
            height: 0;
            border-top: 30rpx solid #FFEE88;
            border-right: 30rpx solid transparent;
            border-left: 30rpx solid transparent;
            position: absolute;
            bottom: -10rpx;
          }
        }
      }
    }
    .tips {
      width: 497rpx;
      font-size: 29rpx;
      color: #FF7A2A;
      text-align: center;
      margin: 22rpx auto 0;
      text {
        color: #FFB900;
        font-size: 33rpx;
      }
    }
    .act_treasure {
      position: relative;
      min-height: 308rpx;
      display: flex;
      align-items: center;
      .scroll_view {
        width: 100%;
        white-space: nowrap;
        & ::-webkit-scrollbar{
          display: none; /* Chrome Safari */
        }
        ::v-deep .uni-scroll-view-content {
          display: flex;
          align-items: center;
        }
        .scroll_view_item {
          display: inline-block;
          padding: 0 19rpx;
          &.scroll_view_item_big {
            padding: 0;
          }
          &.scroll_view_item_pr0 {
            padding-right: 0;
            z-index: 1;
          }
          &.scroll_view_item_pl0 {
            padding-left: 0;
            z-index: 1;
          }
          &.scroll_view_item_first {
            padding-left: 300rpx;
          }
          &.scroll_view_item_last {
            padding-right: 300rpx;
          }
          &.scroll_view_item_big_first {
            padding-left: 220rpx;
          }
          &.scroll_view_item_big_last {
            padding-right: 220rpx;
          }
        }
      }
      .swiper_box {
        text-align: center;
        &.open {
          width: 120rpx !important;
          .swiper_box_t {
            font-size: 32rpx;
            color: #919191;
          }
          image {
            width: 120rpx;
            height: 99rpx;
          }
        }
        &.close {
          width: 103rpx !important;
          .swiper_box_t {
            font-size: 32rpx;
            color: #FFB900;
          }
          image {
            width: 103rpx;
            height: 84rpx;
          }
        }
        image {
          margin-bottom: 14rpx;
        }
      }
      .spine_box {
        width: 310rpx;
        height: 308rpx;
        position: relative;
        .spine_player {
          position: absolute;
          width: 550rpx;
          height: 548rpx;
          left: -120rpx;
          bottom: -100rpx;
        }
        .spine_box_t {
          position: absolute;
          bottom: 30rpx;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 400;
          font-size: 36rpx;
          color: #FFB900;
        }
      }
      .spine_arrow {
        width: 69rpx;
        height: 99rpx;
        position: absolute;
        top: 25%;
        z-index: 1;
        &.left {
          left: 0;
        }
        &.right {
          right: 0;
          transform: rotate(180deg);
        }
      }
    }
  }
  .act_table {
    padding: 0 40rpx;
    margin-bottom: 49rpx;
    &.last {
      margin-bottom: 20rpx;
    }
    .table_title {
      text-align: center;
      font-size: 35rpx;
      color: #BBB58F;
      margin-bottom: 10rpx;
      font-weight: 900;
    }
    .table {
      width: 670rpx !important;
      background: #1B1A1B;
      border-radius: 11rpx;
      padding: 0 0 8rpx 0;
      .table_header {
        height: 72rpx;
        background: linear-gradient(0deg, #292B2E, #384149);
        border-radius: 11rpx 11rpx 0px 0px;
        font-size: 25rpx;
        color: #959595;
        display: flex;
        align-items: center;
        margin-bottom: 9rpx;
        view {
          font-weight: 500;
          flex: 1;
          text-align: center;
        }
      }
      .table_row_box {
        padding: 0 11rpx 0 9rpx;
        min-height: 290rpx;
      }
      .table_row {
        display: flex;
        align-items: center;
        height: 58rpx;
        border-radius: 11rpx;
        font-size: 24rpx;
        color: #FFFFFF;
        view {
          flex: 1;
          text-align: center;
        }
        &:nth-child(2n - 1) {
          background: #151415;
        }
      }
    }
  }
  .act_pagination {
    width: 251rpx;
    height: 67rpx;
    background: #1B1A1B;
    border-radius: 33rpx;
    font-size: 26rpx;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22rpx;
    position: absolute;
    right: 40rpx;
    image {
      width: 21rpx;
      height: 37rpx;
    }
    .arrow_disable_left {
      transform: rotate(180deg);
    }
    .arrow_disable_right {
      transform: rotate(180deg);
    }
  }
  .act_regra {
    margin: 105rpx auto 0;
    width: 689rpx;
    background: #0E0E0F;
    border-radius: 21rpx;
    border: 2rpx solid #31302F;
    text-align: center;
    padding: 40rpx 26rpx 80rpx;
    .regra_title {
      font-size: 35rpx;
      color: #BBB58F;
      margin-bottom: 15rpx;
      font-weight: 900;
    }
    .regra_t {
      text-align: left;
      font-size: 26rpx;
      color: #B4B4B4;
      margin-bottom: 30rpx;
      display: flex;
      // word-break: break-all;
      .regra_t_l {
        width: 20rpx;
        color: #FFB900;
      }
      .regra_t_r {
        flex: 1;
        letter-spacing: 0.5rpx;
      }
    }
  }
  .act_space {
    height: 29rpx;
  }
  .act_goto {
    width: 478rpx;
    height: 122rpx;
    background: linear-gradient(0deg, #D6112C, #F83C54);
    border-radius: 28rpx;
    font-size: 40rpx;
    color: #FFFFFF;
    margin: 19rpx auto 0;
    padding-bottom: 10rpx;
    font-weight: 900;
    &.disabled {
      background: linear-gradient(0deg, #545454, #717171);
      color: #bdbdbd;
    }
  }
  .suspension {
    position: fixed;
    bottom: 26rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 573rpx;
    height: 100rpx;
    opacity: 0;
    transition: all 0.2s linear;
    &.show_suspension {
      opacity: 1;
    }
  }
}
.popupTitle {
  font-weight: 600;
  font-size: 34rpx;
  color: #FFEE88;
  margin-bottom: 40rpx;
  text-align: center;
  text {
    color: #FFB900;
  }
}
.popupShare {
  padding: 0 63rpx 20rpx;
}
.popupCopy {
  padding: 0 31rpx;
}
.act_copy {
  background: #2D3242;
  color: #7DAEFF;
  padding-left: 24rpx;
  border-radius: 38rpx;
  .copy_input {
    flex: 1;
    font-size: 25rpx;
  }
  .copy_btn {
    background: #1E6BFF;
    border-radius: 40rpx;
    width: 153rpx;
    height: 81rpx;
    flex-shrink: 0;
    color: #fff;
    font-size: 33rpx;
    font-weight: 900;
  }
}
.share_name {
  font-size: 25rpx;
  color: #959595;
  margin-top: 6rpx;
}
</style>

<style lang="scss">
.personal-title {
  @apply flex items-center justify-center;
  font-size: 33rpx;
  font-weight: bold;
  color: #454545;
  height: 100rpx;
}
</style>
