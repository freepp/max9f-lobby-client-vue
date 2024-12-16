<template>
  <view class="uni-async-error"></view>
</template>

<script lang="ts" setup>
onMounted(() => {
  setTimeout(() => {
    console.log('AsyncErrorNew');
    if (window?.location?.reload) {
      console.log('AsyncErrorNew window.location.reload');
      window.location.reload()
    } else {
      console.log('AsyncErrorNew uni.reLaunch');
      uni.reLaunch({
        url: '/pages/index/index'
      })
    }
  }, 0)
})
</script>

<script lang='ts'>
export default {
  name: "AsyncErrorNew"
}
</script>
