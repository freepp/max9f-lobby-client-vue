//推广类型1-棋牌2-电子3-捕鱼4-真人5-彩票6-体育
import { i18n } from '@/common/i18nConfig'
const { t: $t } = i18n.global
export const typeList = [
    {
        name: $t('KEY_AGENT_GAME_TYPE_BOARD'),
        value: 1,
    },
    {
        name: $t('KEY_AGENT_GAME_TYPE_ELECTRONIC'),
        value: 2,
    },
    {
        name: $t('KEY_AGENT_GAME_TYPE_FISHING'),
        value: 3,
    },
    {
        name: $t('KEY_AGENT_GAME_TYPE_LIVE'),
        value: 4,
    },
    {
        name: $t('KEY_AGENT_GAME_TYPE_LOTTERY'),
        value: 5,
    },
    {
        name: $t('KEY_AGENT_GAME_TYPE_SPORTS'),
        value: 6,
    },
]
export const allTypeList = [
    {
        name: $t('KEY_AGENT_GAME_TYPE_ALL'),
        value: null
    },
    ...typeList,
]
