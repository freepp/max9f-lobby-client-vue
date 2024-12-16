<template>
  <view class="amount-select-view">
      <view class="title">{{ $t('KEY_PAY_SELECTAMOUNT') }}</view>
      <view class="btn-view">
          <view
              class="select-btn"
              v-for="(item, index) in amountList"
              :class="{ selected: data.chooseIndex === index }"
              :key="index"
              @click="() => btnClick(index)"
          >
              <view>R$ {{ item }}</view>
              <view class="choosed-icon" v-show="data.chooseIndex === index">
                  <img src="@/static/icon/checked_float.png" alt="" />
              </view>
          </view>
      </view>
  </view>
</template>

<script lang="ts" setup>
  const { t: $t } = i18n.global

  interface Props {
      payParams?: any
      amountList: any
  }
  const props = withDefaults(defineProps<Props>(), {
      payParams: {},
      amountList: {},
  })

  interface Data {
      amount: number | string
      chooseIndex: number | string
  }
  const data = reactive<Data>({
      amount: 0,
      chooseIndex: '',
  })

  const btnClick = (index) => {
      if (data.chooseIndex === index) return
      data.chooseIndex = index
      data.amount = props.amountList[index]

      props.payParams.amount = data.amount
  }

  const getAmount = () => {
      return data.amount
  }
  watch(
      () => props.amountList,
      () => {
          data.chooseIndex = ''
          btnClick(0)
      }, {
      deep: true,
      immediate: true
    }
  )

  defineExpose({
      getAmount,
  })
</script>

<style lang="scss">
  .amount-select-view {
      .title {
          @apply text-white-60;
          font-size: 25rpx;
      }

      .btn-view {
          @apply flex items-center flex-wrap;
          margin-top: 10rpx;
          width: calc(100% + 30rpx);
          .select-btn {
              @apply flex justify-center items-center relative flex-col rounded-7 text-white-100;
              // margin: 0 10rpx;
              border: 2rpx solid;
              @apply border-black-80;
              margin: 10rpx 0;
              margin-right: 10rpx;
              width: 210rpx;
              height: 90rpx;
              font-weight: bold;
              font-size: 28rpx;
              .bonus {
                  @apply text-yellow;
                  font-size: 22rpx;
                  font-weight: bold;
              }
              .choosed-icon {
                  @apply absolute right-0 bottom-0;
                  width: 25rpx;
                  height: 25rpx;
                  img {
                      @apply w-full h-full;
                  }
              }
              .select_hot {
                position: absolute;
                top: -5rpx;
                right: -12rpx;
                width: 90rpx;
                height: 27rpx;
                img {
                  width: 90rpx;
                  height: 27rpx;
                }
              }
          }
          .selected {
              border-color: var(--primary-color);
          }
      }
      .tips {
          @apply text-white-60;
          font-size: 25rpx;
          margin-top: 10rpx;
      }

      .input-view {
          @apply relative flex justify-between bg-black-60;
          margin-top: 20rpx;
          border-radius: 10rpx;
          .currency {
              @apply absolute h-full flex items-center text-white-100;
              left: 20rpx;
              font-size: 33rpx;
              font-weight: bold;
          }
          input {
              @apply flex-1;
              margin-left: 50rpx;
          }
          ::v-deep input {
              @apply bg-black-60 text-white-100 font-bold;
          }
          .bonusNow {
              @apply flex justify-end items-center text-yellow;
              width: 100rpx;
              font-size: 33rpx;
              font-weight: bold;
              padding-right: 20rpx;
          }
      }
  }

  ::v-deep uni-input {
      height: 90rpx !important;
      background-color: #fff;
      padding: 0 30rpx;
      border-radius: 8rpx;
      font-size: 28rpx;
      color: #414141;
  }
</style>
