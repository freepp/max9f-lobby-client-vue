import { isPhone, isEmail, isCurrentDate } from '@/common/validate'
import { i18n } from '@/common/i18nConfig'
const { t: $t } = i18n.global

const qrCode = [
    {
        key: 'accName',
        label: $t('KEY_FORM_ACCNAME'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_ACCNAME'),
        required: true,
        type: 'input',
    },
    {
        key: 'taxId',
        label: $t('KEY_FORM_TAXID'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_TAXID'),
        required: true,
        type: 'input',
    },
]

const formRules = {
    accName: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_ACCNAME'),
            },
        ],
    },
    taxId: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_TAXID'),
            },
        ],
    },
    key: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_KEY'),
            },
        ],
    },
}

const pageConfig = {
    braPIX: {
        headerTitle: $t('KEY_FORMTITLE_ADDCARD'),
        formConfig: qrCode,
        btnText: $t('KEY_COMMON_CONFIRM'),
    },
}

export { formRules, pageConfig, qrCode }
