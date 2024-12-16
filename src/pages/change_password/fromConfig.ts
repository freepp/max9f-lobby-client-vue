import { isPhone, isEmail } from '@/common/validate'
import { i18n } from '@/common/i18nConfig'
const { t: $t } = i18n.global
import { useUsersStore } from '@/store/userStore'
import { FormItemConfig } from '@/models/common'
//const store = useUsersStore()

//注册

const usernameAndPwLogin = [
    {
        key: 'username',
        label: $t('KEY_FORM_USERNAME'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_USERNAME'),
        required: true,
        type: 'inputCustom',
    },
    {
        key: 'password',
        label: $t('KEY_FORM_PASSWORD'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_PASSWORD'),
        required: true,
        type: 'inputCustom',
        cypto: true,
    },
]

const userAndPwRegister = [
    {
        key: 'mobile',
        label: $t('KEY_FORM_MOBILE'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_MOBILE'),
        required: true,
        type: 'inputCustom',
    },
    {
        key: 'password',
        label: $t('KEY_FORM_PASSWORD'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_PASSWORD'),
        required: true,
        type: 'inputCustom',
        cypto: true,
    },
    // {
    //     key: 'repeatPassword',
    //     label: $t('KEY_FORM_CONFIRMPASSWORD'),
    //     placeholder: $t('KEY_FORM_PLACEHOLDER_CONFIRMPASSWORD'),
    //     required: true,
    //     type: 'inputCustom',
    //     cypto: true,
    // },
]

const emailAndPwRegister = [
    {
        key: 'email',
        label: $t('KEY_FORM_EMAIL'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_EMAIL'),
        required: true,
        type: 'input',
    },
    {
        key: 'password',
        label: $t('KEY_FORM_PASSWORD'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_PASSWORD'),
        required: true,
        type: 'inputCustom',
        cypto: true,
    },
    {
        key: 'repeatPassword',
        label: $t('KEY_FORM_CONFIRMPASSWORD'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_CONFIRMPASSWORD'),
        required: true,
        type: 'inputCustom',
        cypto: true,
    },
]

// 登录
// loginMode: 1 游客
// loginMode: 2 用户名+密码
const userAndPwLogin = [
    {
        key: 'username',
        label: $t('KEY_FORM_USERNAME'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_USERNAME'),
        required: true,
        type: 'inputCustom',
    },
    {
        key: 'password',
        label: $t('KEY_FORM_PASSWORD'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_PASSWORD'),
        required: true,
        type: 'inputCustom',
        cypto: true,
    },
]

// loginMode: 3 邮箱+密码
const emailAndPwLogin = [
    {
        key: 'email',
        label: $t('KEY_FORM_EMAIL'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_EMAIL'),
        required: true,
        type: 'input',
    },
    {
        key: 'password',
        label: $t('KEY_FORM_PASSWORD'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_PASSWORD'),
        required: true,
        type: 'inputCustom',
        cypto: true,
    },
]

// loginMode: 4 手机+密码
const mobileAndPwLogin = [
    {
        key: 'mobile',
        label: $t('KEY_FORM_MOBILE'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_MOBILE'),
        required: true,
        type: 'inputCustom',
    },
    {
        key: 'password',
        label: $t('KEY_FORM_PASSWORD'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_PASSWORD'),
        required: true,
        type: 'inputCustom',
        cypto: true,
    },
]

// loginMode: 5 手机+验证码
const mobileAndCodeLogin = [
    {
        key: 'mobile',
        label: $t('KEY_FORM_MOBILE'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_MOBILE'),
        required: true,
        type: 'inputCustom',
    },
]

// 忘记密码
const mobileForgotPassword = [
    {
        key: 'mobile',
        label: $t('KEY_FORM_MOBILE'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_MOBILE'),
        required: true,
        type: 'inputCustom',
    },
]

const setNeWPassword = [
    {
        key: 'newPassword',
        label: $t('KEY_FORM_NEWPASSWORD'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_NEWPASSWORD'),
        required: true,
        type: 'inputCustom',
        cypto: true,
    },
]

// 更改密码

const changePassword = [
    {
        key: 'oldPassword',
        label: $t('KEY_FORM_OLDPASSWORD'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_OLDPASSWORD'),
        required: true,
        type: 'inputCustom',
        cypto: true,
        dark: true,
    },
    {
        key: 'newPassword',
        label: $t('KEY_FORM_NEWPASSWORD'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_NEWPASSWORD'),
        required: true,
        type: 'inputCustom',
        cypto: true,
        dark: true,
    },
]
const formRules = {
    mobile: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_MOBILE1'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
					const store = useUsersStore()
                    if (store.baseConfig.countryId === 'BRA') {
                        if (isPhone(value, 'pt-BR')) {
                            return true
                        } else {
                            callback($t('KEY_BIND_MOBIEL_ERROR'))
                        }
                    } else {
                        return true
                    }
                },
            },
        ],
    },
    verifyCode: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_BIND_VERIFY_REQUIRED'),
            },
        ],
    },
    username: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_USERNAME'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    if (value.length < 6 || value.length > 30) {
                        callback($t('KEY_MESSAGE_ERRORCODE18'))
                    }
                    return true
                },
            },
        ],
    },

    email: {
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
    password: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_PASSWORD'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    if (value.length < 6 || value.length > 16) {
                        callback($t('KEY_FORM_RULE_PASSWORD2'))
                    }
                    return true
                },
            },
        ],
    },
    // repeatPassword: {
    //     rules: [
    //         {
    //             required: true,
    //             errorMessage: $t('KEY_FORM_RULE_CONFIRMPASSWORD'),
    //         },
    //         {
    //             validateFunction: function (rule, value, data, callback) {
    //                 if (value.length < 6 || value.length > 16) {
    //                     callback($t('KEY_FORM_RULE_PASSWORD2'))
    //                 }
    //                 if (data.password !== value) {
    //                     callback($t('KEY_FORM_RULE_CONFIRMPASSWORD2'))
    //                 }
    //                 return true
    //             },
    //         },
    //     ],
    // },
    oldPassword: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_OLDPASSOWRD'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    if (value.length < 6 || value.length > 16) {
                        callback($t('KEY_FORM_RULE_PASSWORD2'))
                    }
                    return true
                },
            },
        ],
    },
    newPassword: {
        rules: [
            {
                required: true,
                errorMessage: $t('KEY_FORM_RULE_NEWPASSWORD'),
            },
            {
                validateFunction: function (rule, value, data, callback) {
                    if (value.length < 6 || value.length > 16) {
                        callback($t('KEY_FORM_RULE_PASSWORD2'))
                    }
                    return true
                },
            },
        ],
    },
}

const pageConfig = {
    0: {
        2: {
            headerTitle: $t('KEY_FORMTITLE_USERLOGIN'),
            pageType: 0,
            loginMode: 2,
            formConfig: userAndPwLogin,
            hasCode: false,
            formTips: '',
            currentStep: 'form',
            btnText: $t('KEY_FORMBTN_LOGIN'),
            nextStep: -1,
            lastStep: -1,
        },
        3: {
            headerTitle: $t('KEY_FORMTITLE_EMAILLOGIN'),
            pageType: 0,
            loginMode: 3,
            formConfig: emailAndPwLogin,
            hasCode: false,
            formTips: '',
            currentStep: 'form',
            btnText: $t('KEY_FORMBTN_LOGIN'),
            nextStep: -1,
            lastStep: -1,
        },
        4: {
            headerTitle: $t('KEY_FORMTITLE_MOBILELOGIN'),
            pageType: 0,
            loginMode: 4,
            formConfig: mobileAndPwLogin,
            hasCode: false,
            formTips: '',
            currentStep: 'form',
            btnText: $t('KEY_FORMBTN_LOGIN'),
            nextStep: -1,
            lastStep: -1,
        },
        5: {
            headerTitle: $t('KEY_FORMTITLE_MOBILEVLOGIN'),
            pageType: 0,
            loginMode: 5,
            formConfig: mobileAndCodeLogin,
            hasCode: true,
            formTips: $t('KEY_FORMTIPS_LOGINSTEP1'),
            currentStep: 'form',
            btnText: $t('KEY_FORMBTN_LOGINSTEP1'),
            nextStep: 99,
            lastStep: -1,
        },
        99: {
            headerTitle: $t('KEY_FORMTITLE_VERIFY'),
            pageType: 0,
            loginMode: 5,
            formConfig: null,
            hasCode: false,
            formTips: $t('KEY_FORMTIPS_LOGINSTEP2'),
            currentStep: 'code',
            btnText: $t('KEY_FORMBTN_LOGIN'),
            nextStep: -1,
            lastStep: 5,
        },
    },
    1: {
        2: {
            headerTitle: $t('KEY_FORMTITLE_NAMEREGISTER'),
            pageType: 1,
            loginMode: 2,
            formConfig: usernameAndPwLogin,
            hasCode: false,
            formTips: '',
            currentStep: 'form',
            btnText: $t('KEY_FORMBTN_REGISTER'),
            nextStep: -1,
            lastStep: -1,
        },
        3: {
            headerTitle: $t('KEY_FORMTITLE_EMAILREGISTER'),
            pageType: 1,
            loginMode: 3,
            formConfig: emailAndPwRegister,
            hasCode: false,
            formTips: '',
            currentStep: 'form',
            btnText: $t('KEY_FORMBTN_REGISTER'),
            nextStep: -1,
            lastStep: -1,
        },
        4: {
            headerTitle: $t('KEY_FORMTITLE_MOBILEREGISTER'),
            pageType: 1,
            loginMode: 4,
            formConfig: userAndPwRegister,
            hasCode: true,
            formTips: $t('KEY_FORMTIPS_REGISTERSTEP1'),
            currentStep: 'form',
            btnText: $t('KEY_FORMBTN_LOGINSTEP1'),
            nextStep: 99,
            lastStep: -1,
        },
        99: {
            headerTitle: $t('KEY_FORMTITLE_VERIFY'),
            pageType: 1,
            loginMode: 4,
            formConfig: null,
            hasCode: false,
            formTips: $t('KEY_FORMTIPS_REGISTERSTEP2'),
            currentStep: 'code',
            btnText: $t('KEY_FORMBTN_REGISTER'),
            nextStep: -1,
            lastStep: 4,
        },
    },
    2: {
        0: {
            headerTitle: $t('KEY_FORMTITLE_FORGETPASSWORD'),
            pageType: 2,
            loginMode: 0,
            formConfig: mobileForgotPassword,
            hasCode: true,
            formTips: $t('KEY_FORMTIPS_RESETPASSWORD1'),
            currentStep: 'form',
            btnText: $t('KEY_FORMBTN_LOGINSTEP1'),
            nextStep: 99,
            lastStep: -1,
        },
        99: {
            headerTitle: $t('KEY_FORMTITLE_VERIFY'),
            pageType: 2,
            loginMode: 0,
            formConfig: null,
            hasCode: false,
            formTips: $t('KEY_FORMTIPS_RESETPASSWORD2'),
            currentStep: 'code',
            btnText: $t('KEY_FORMBTN_VERIFY'),
            nextStep: 1,
            lastStep: 0,
        },
        1: {
            headerTitle: $t('KEY_FORMTITLE_NEWPASSWORD'),
            pageType: 2,
            loginMode: 0,
            formConfig: setNeWPassword,
            hasCode: false,
            formTips: $t('KEY_FORMTIPS_RESETPASSWORD3'),
            currentStep: 'form',
            btnText: $t('KEY_COMMON_CONFIRM'),
            nextStep: -1,
            lastStep: 99,
        },
    },
    3: {
        0: {
            headerTitle: $t('KEY_FORMTITLE_CHANGEPASSWORD'),
            pageType: 3,
            loginMode: 0,
            formConfig: changePassword,
            hasCode: false,
            formTips: $t('KEY_FORMTIPS_CHANGEPASSWORD'),
            currentStep: 'form',
            btnText: $t('KEY_COMMON_CONFIRM'),
            nextStep: -1,
            lastStep: -1,
        },
    },
}
export const mobileAndVerifyCode: FormItemConfig[] = [
    {
        key: 'mobile',
        label: $t('KEY_FORM_MOBILE'),
        placeholder: $t('KEY_FORM_PLACEHOLDER_MOBILE'),
        required: true,
        type: 'inputCustom',
        cypto: true,
    },
    {
        key: 'verifyCode',
        label: '',
        placeholder: '',
        required: true,
        type: 'verifyCode',
        cypto: false,
        relative: 'mobile',
    },
]
export { formRules, pageConfig }
