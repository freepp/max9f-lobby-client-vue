<template>
  <view></view>
</template>

<script lang="ts" setup>
onMounted(() => {
  console.log('isAppFirstToEmpty');
  uni.removeStorageSync('isAppFirstToEmpty')
  setTimeout(() => {
    uni.reLaunch({
      url: '/pages/index/index'
    })
  }, 0)
})
</script>
