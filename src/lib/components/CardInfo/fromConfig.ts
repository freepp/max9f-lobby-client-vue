import { isPhone, isEmail, isCurrentDate } from '@/common/validate'
import { i18n } from '@/common/i18nConfig'
const { t: $t } = i18n.global

const mexSPEICardInfo = [
    {
        key: 'userName',
        label: $t('KEY_FORM_USERNAME_CARDINFO'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_USERNAME'),
        required: true,
        type: 'input',
        dark: true,
    },
    {
        key: 'cardNo',
        label: $t('KEY_FORM_CARDNO'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_CARDNO'),
        required: true,
        type: 'input',
        dark: true,
    },
    {
        key: 'bankCode',
        label: $t('KEY_FORM_BANKNAME'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_BANKCODE'),
        required: true,
        type: 'cardSelect',
        dark: true,
    },
    // {
    //     key: 'bankName',
    //     label: $t('KEY_FORM_BANKNAME'),
    //     placeholder: $t('KEY_FORM_RULE_BANKNAME'),
    //     required: true,
    //     type: 'input',
    // },
    // {
    //     key: 'cvv',
    //     label: $t('KEY_FORM_CVV'),
    //     placeholder: $t('KEY_FORM_PLACEHOLDER_CVV'),
    //     required: true,
    //     type: 'input',
    // },
    // {
    //     key: 'expiryDate',
    //     label: $t('KEY_FORM_EXPIRYDATE'),
    //     placeholder: $t('KEY_FORM_PLACEHOLDER_EXPIRYDATE'),
    //     required: true,
    //     type: 'input',
    // },
]

const braPIXCardInfo = [
    {
        key: 'accName',
        label: $t('KEY_FORM_ACCNAME'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_ACCNAME'),
        required: true,
        type: 'input',
        dark: true,
    },
    {
        key: 'taxId',
        label: $t('KEY_FORM_TAXID'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_TAXID'),
        required: true,
        type: 'input',
        dark: true,
    },
    {
        key: 'key',
        label: $t('KEY_FORM_KEY'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_KEY'),
        required: true,
        type: 'input',
        dark: true,
    },
    {
        key: 'tejeePayMethod',
        label: $t('KEY_FORM_KEY'),
        placeholder: 'tejeePayMethod',
        required: true,
        type: 'payMethod',
        dark: true,
    },

    // {
    //     key: 'bankCode',
    //     label: $t('KEY_FORM_BANKNAME'),
    //     placeholder: $t('KEY_FORM_PLACEHOLDER_BANKCODE'),
    //     required: true,
    //     type: 'cardSelect',
    // },
    // {
    //     key: 'branchCode',
    //     label: 'branchCode',
    //     placeholder: 'Enter your branch code',
    //     required: true,
    //     type: 'input',
    // },
    // {
    //     key: 'accountType',
    //     label: 'accountType',
    //     placeholder: 'Enter your account type',
    //     required: true,
    //     type: 'input',
    // },
    // {
    //     key: 'bankName',
    //     label: $t('KEY_FORM_BANKNAME'),
    //     placeholder: $t('KEY_FORM_RULE_BANKNAME'),
    //     required: true,
    //     type: 'input',
    // },
    // {
    //     key: 'cvv',
    //     label: $t('KEY_FORM_CVV'),
    //     placeholder: $t('KEY_FORM_PLACEHOLDER_CVV'),
    //     required: true,
    //     type: 'input',
    // },
    // {
    //     key: 'expiryDate',
    //     label: $t('KEY_FORM_EXPIRYDATE'),
    //     placeholder: $t('KEY_FORM_PLACEHOLDER_EXPIRYDATE'),
    //     required: true,
    //     type: 'input',
    // },
]

const formRules = {
    userName: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_USERNAME'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    if (value.length > 30) {
                        callback($t('KEY_FORM_PLACEHOLDER_NICKNAME2', { num: '30' }))
                    }
                    return true
                },
            },
        ],
    },
    cardNo: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_CARDNO'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    let validate = isCurrentDate(value, 'CardDate')
                    if (value.length > 18 || value.length < 16) {
                        callback($t('KEY_FORM_RULE_CARDLENGTH'))
                    }
                    return true
                },
            },
        ],
    },
    bankCode: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_BANKNAME'),
            },
        ],
    },
    bankName: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_BANKNAME'),
            },
        ],
    },
    cvv: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_CVV'),
            },
        ],
    },
    expiryDate: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_EXPIRYDATE'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    let validate = isCurrentDate(value, 'CardDate')
                    if (!validate) {
                        callback($t('KEY_FORM_RULE_EXPIRYDATE3'))
                    }
                    return true
                },
            },
        ],
    },
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
            {
                validateFunction: function (rule, value, data, callback) {
                    let validate = false
                    switch (data.tejeePayMethod) {
                        case 0:
                            console.log(data)
                            if (value.length !== 11) {
                                callback($t('KEY_FORM_RULE_CPF'))
                            }
                            if (data.taxId && data.taxId !== value) {
                                console.log(data, value)
                                callback(
                                    'Seu CPF e o CPF utilizado para saques são diferentes'
                                )
                            }
                            break
                        case 1:
                            if (value.length !== 14) {
                                callback($t('KEY_FORM_RULE_CNPJ'))
                            }
                            break
                        case 2:
                            validate = isPhone(value, 'pt')
                            if (!validate) {
                                callback($t('KEY_FORM_RULE_MOBILE2'))
                            }
                            break
                        case 3:
                            validate = isEmail(value)
                            if (!validate) {
                                callback($t('KEY_FORM_RULE_EMAIL2'))
                            }
                            break
                        default:
                    }
                    // let validate = isCurrentDate(value, 'CardDate')
                    // if (!validate) {
                    //     callback($t('KEY_FORM_RULE_EXPIRYDATE3'))
                    // }
                    return true
                },
            },
        ],
    },
}

const pageConfig = {
    mexSPEI: {
        headerTitle: $t('KEY_FORMTITLE_ADDCARD'),
        formConfig: mexSPEICardInfo,
        btnText: $t('KEY_COMMON_CONFIRM'),
    },
    braPIX: {
        headerTitle: $t('KEY_FORMTITLE_ADDCARD'),
        formConfig: braPIXCardInfo,
        btnText: $t('KEY_COMMON_CONFIRM'),
    },
}

export { formRules, pageConfig, mexSPEICardInfo, braPIXCardInfo }
