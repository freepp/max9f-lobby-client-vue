import { isPhone, isEmail, isCurrentDate } from '@/common/validate'
import { i18n } from '@/common/i18nConfig'
const { t: $t } = i18n.global

// 个人信息
const userInfoTemplate = [
    {
        key: 'NickName',
        label: $t('KEY_FORM_NICKNAME'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_NICKNAME'),
        required: true,
        type: 'input',
    },
    {
        key: 'FirstName',
        label: $t('KEY_FORM_FIRSTNAME'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_FIRSTNAME'),
        required: true,
        type: 'input',
    },
    {
        key: 'LastName',
        label: $t('KEY_FORM_LASTNAME'),
        placeholder: $t('KEY_FORM_RULE_LASTNAME'),
        required: true,
        type: 'input',
    },
    {
        key: 'BirthDay',
        label: $t('KEY_FORM_BIRTH'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_BIRTH'),
        required: true,
        type: 'datePicker',
    },
    {
        key: 'PhoneNumber',
        label: $t('KEY_FORM_PHONE'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_PHONE'),
        required: true,
        type: 'input',
    },
    {
        key: 'Email',
        label: $t('KEY_FORM_EMAIL_USER'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_EMAIL_USER'),
        required: true,
        type: 'input',
    },
]

const formRules = {
    NickName: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_NICKNAME'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    if (value.length > 15) {
                        callback($t('KEY_FORM_PLACEHOLDER_NICKNAME2', { num: '15' }))
                    }
                    return true
                },
            },
        ],
    },
    FirstName: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_FIRSTNAME'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    if (value.length > 15) {
                        callback($t('KEY_FORM_PLACEHOLDER_NICKNAME2', { num: '15' }))
                    }
                    return true
                },
            },
        ],
    },
    LastName: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_LASTNAME'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    if (value.length > 15) {
                        callback($t('KEY_FORM_PLACEHOLDER_NICKNAME2', { num: '15' }))
                    }
                    return true
                },
            },
        ],
    },
    BirthDay: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_BIRTHDAY'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    let validate = isCurrentDate(value)
                    if (!validate) {
                        callback($t('KEY_FORM_RULE_EXPIRYDATE2'))
                    }
                    return true
                },
            },
        ],
    },
    Email: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_EMAIL1'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    let validate = isEmail(value)
                    if (!validate) {
                        callback($t('KEY_FORM_RULE_EMAIL2'))
                    }
                    return true
                },
            },
        ],
    },
    PhoneNumber: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_MOBILE1'),
            },
        ],
    },
}

const pageConfig = {
    0: {
        headerTitle: $t('KEY_FORMTITLE_USERINFO'),
        formConfig: userInfoTemplate,
        btnText: $t('KEY_COMMON_CONFIRM'),
    },
}

export { formRules, pageConfig, userInfoTemplate }
