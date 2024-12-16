<template>
    <img
        v-if="commonStore.bannerData[position]?.[0]?.imageUrl"
        @click="navTo(commonStore.bannerData[position]?.[0])"
        :src="commonStore.bannerData[position]?.[0]?.imageUrl"
    />
</template>
<script lang="ts" setup>
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { openGame } from '@/common/game'

    const commonStore = useCommonStore()
    const store = useUsersStore()

    interface Prop {
        position: number
    }
    const props = defineProps<Prop>()

    const navTo = (banner) => {
        switch (banner.linkType) {
            case 1:
                if (banner.linkUrl) {
                    uni.navigateTo({
                        url: `${banner.linkUrl}`,
                        fail() {
                            uni.switchTab({
                                url: `${banner.linkUrl}`,
                            })
                        },
                    })
                }
                break
            case 2:
                break
            case 3:
                openGame(JSON.parse(banner.linkParams), 'home_game_click')
                break
            default:
        }
    }
    const getBannersByType = async () => {
        if (props.position) {
            let params = Object.assign(
                {
                    userId: store.userInfo.userId,
                    position: [props.position],
                },
                store.commonParams
            )
            // let res1 = await lobbyApi.sCommon.banner(params)
            let res = await commonApi.banner.bannerBannerCreate(params)

            if (res.success) {
                commonStore.bannerData = Object.assign(
                    commonStore.bannerData,
                    res.result
                )
            } else {
                ErrorHandler(res, 'getBannersByType')
            }
        }
    }
    const initData = () => {
        if (store.userInfo) {
            getBannersByType()
            // getBanner()
        }
    }
    onMounted(() => {
        initData()

    })
    watch(
        () => store.userInfo,
        () => {
            initData()
        }
    )
</script>
<style lang="scss"></style>
