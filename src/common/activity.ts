import { UserCurrentActivityDto } from '@/NET/lobby/data-contracts'
import { useUsersStore } from '@/store/userStore'
import { api as lobbyApi } from '@/NET/lobby'
//const store = useUsersStore()
import { ref } from 'vue'
import _ from 'lodash'
export const currentActivity = ref<UserCurrentActivityDto>({})
export const getCurrentActivity = async (type = 3) => {
	const store = useUsersStore()
    let params = Object.assign(_.cloneDeep(store.commonParams), {
        userId: store.userInfo.userId,
        recommendType: type,
    })
    const res = await lobbyApi.profile.getCurrentActivity(params)
    if (res.success) {
        currentActivity.value = res.result
    }
}
