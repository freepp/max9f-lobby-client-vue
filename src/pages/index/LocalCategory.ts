import { i18n } from '@/common/i18nConfig'
const { t: $t } = i18n.global
export const categoryData = [
    {
        categoryId: 1,
        categoryName: $t('KEY_MENU_TOPGAMES'),
    },
    {
        categoryId: 2,
        categoryName: $t('KEY_MENU_NEWGAMES'),
    },
    // {
    //     categoryId: 3,
    //     categoryName: $t('KEY_MENU_SLOTS'),
    // },
    // {
    //     categoryId: 4,
    //     categoryName: $t('KEY_MENU_TABLEGAMES'),
    // },
    // {
    //     categoryId: 5,
    //     categoryName: $t('KEY_MENU_CASINO'),
    // },
    // {
    //     categoryId: 6,
    //     categoryName: $t('KEY_MENU_ROULETTE'),
    // },
    // {
    //     categoryId: 7,
    //     categoryName: $t('KEY_MENU_LOTTERY'),
    // },
    {
        categoryId: 8,
        categoryName: $t('KEY_MENU_ALLGAMES'),
    },
    {
        categoryId: 0,
        categoryName: $t('KEY_MENU_FORYOU'),
    },
]
