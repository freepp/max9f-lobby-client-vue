<template>
    <view class="message-view">
        <uni-popup ref="message" type="message">
            <uni-popup-message
                :type="data.msgType"
                :message="data.messageText"
                :duration="2000"
            ></uni-popup-message>
        </uni-popup>
    </view>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue'

    interface Message {
        type: string
        msgType: string
        messageText: string
        value: string
    }

    const data = reactive<Message>({
        type: 'center',
        msgType: 'success',
        messageText: '',
        value: '',
    })

    const message = ref()

    const messageToggle = (config) => {
        data.msgType = config.type
        data.messageText = config.message
        message.value.open()
    }

    defineExpose({
        messageToggle,
    })
</script>
<style lang="scss">
    .message-view {
    }

    ::v-deep .uni-popup {
        z-index: 5000 !important;
    }
</style>
