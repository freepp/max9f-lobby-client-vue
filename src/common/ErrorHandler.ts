import { i18n } from '@/common/i18nConfig'
const { t: $t } = i18n.global

export const ErrorHandler = (data, funName) => {
    if (data.code === 'G_JwtTokenExpired') {
        goLogin()
    }
    switch (data.status) {
        case 401:
            goLogin()
            break
        default:
            console.log(
                `\n${funName} err\ncode: ${data.code} \nmessage: ${data.message}\n `
            )
    }
}

export let ErrorCode = {
    SMSLimited: $t('KEY_MESSAGE_ERRORCODE1'),
    SMSSendError: $t('KEY_MESSAGE_ERRORCODE2'),
    VerifyCodeError: $t('KEY_MESSAGE_ERRORCODE3'),
    NicknameExist: $t('KEY_MESSAGE_ERRORCODE4'),
    PasswordDifferent: $t('KEY_MESSAGE_ERRORCODE5'),
    SecurityCodeErr: $t('KEY_MESSAGE_ERRORCODE6'),
    MobileExist: $t('KEY_MESSAGE_ERRORCODE7'),
    UsernameExist: $t('KEY_MESSAGE_ERRORCODE8'),
    EmailExist: $t('KEY_MESSAGE_ERRORCODE9'),
    MobileNotExist: $t('KEY_MESSAGE_ERRORCODE10'),
    UserStatusError: $t('KEY_MESSAGE_ERRORCODE11'),
    LoginErrorLimit: $t('KEY_MESSAGE_ERRORCODE12'),
    UserPasswordError: $t('KEY_MESSAGE_ERRORCODE13'),
    G_JwtTokenInvalid: $t('KEY_MESSAGE_ERRORCODE14'),
    G_JwtTokenExpired: $t('KEY_MESSAGE_ERRORCODE15'),
    UsernameInvalid: $t('KEY_MESSAGE_ERRORCODE18'),
    UsernameNotExist: $t('KEY_MESSAGE_ERRORCODE19'),
    RS_REPEAT_ADDITION: 'Esta Chave PIX já foi adicionada',
}

export let PayErrorCode = {
    RS_NOT_ENOUGH_MONEY: $t('KEY_MESSAGE_ERRORCODE16'),
    RS_PAY_VALIDATION_ERROR: $t('KEY_MESSAGE_ERRORCODE17'),
    RS_CASH_NUM_LIMIT:
        'Limite de retiradas de hoje atingido! Por favor, tente novamente amanhã.',
        // $t('KEY_RS_CASH_NUM_LIMIT')
}

const goLogin = () => {
    uni.navigateTo({ url: '/pages/login/index?login_mode=2' })
}

// export let PayErrorCode = {
//     RS_UNKNOWN: '通用失败报错',
//     RS_NOT_ENOUGH_MONEY: '用户余额不足',
//     RS_USER_DISABLED: '用户被禁用/锁定并且无法下注',
//     RS_TRANSFER_FAILED: '传输失败',
//     RS_INVALID_APP: '未知游戏',
//     RS_INVALID_SIGNATURE: '验证签名错误',
//     RS_WRONG_SYNTAX: '收到的请求与预期的请求形式和语法不匹配',
//     RS_INVALID_TOKEN: '未知的令牌（我方提供的token）',
//     RS_TOKEN_EXPIRED: '令牌过期(token)',
//     RS_WRONG_CURRENCY: '交易货币不同于用户的钱包货币',
//     RS_INVALID_PARTNER: '运营商被禁用',
//     RS_DUPLICATE_TRANSACTION: '发送了具有相同 transaction_uuid 的交易',
//     RS_PROCESSING_TRANSACTION:
//         '发送了具有相同 transaction_uuid 的交易，但正在处理中',
//     RS_TRANSACTION_DOES_NOT_EXIST:
//         '当在我方找不到获胜请求中引用的投注时返回（未处理或回滚）',
//     RS_PAY_VALIDATION_ERROR: '第三方支付过程验证错误',
// }
