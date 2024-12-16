import {useUsersStore} from "@/store/userStore"


const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const staticImageUrl = async (suffix: String) => {
    const userStore = useUsersStore()
    for (;;) {
        if (userStore.baseConfig.imgBaseUrl && userStore.baseConfig.operatorId) {
            return userStore.baseConfig.imgBaseUrl+ "/logo/" + userStore.baseConfig.operatorId + suffix
        }
        await sleep(100)
    }
}

export { staticImageUrl }