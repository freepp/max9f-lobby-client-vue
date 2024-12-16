enum Platform {
    bet77s = "bet77s",
    max9f = 'max9f',
    pg77 = 'pg77',
}

const getPlatform = (): Platform => {
    switch (location.host) {
        case "www.bet77s.com":
        case "uat.bet77s.com":
            return Platform.bet77s
        case "uat-max9f.bet77s.com":
        case "www.max9f.com":
            return Platform.max9f
        case "uat-pg77.bet77s.com":
        case "www.pg77.game":
            return Platform.pg77
        default:
            return Platform.bet77s
    }
}

const getImgPrefix = (): string => {
    switch (getPlatform()) {
        case Platform.bet77s:
            return "./static/bra"
        case Platform.max9f:
            return './static/braMax9f'
        case Platform.pg77:
            return './static/braPg77'
    }
}

const getApkUrl = (): string => {
    switch (getPlatform()) {
        case Platform.bet77s:
            return "https://static.bet77s.com/download/apk/bet77s.apk"
    }
}

const CHANNEL_DATA = {
  'bet77s': {
    path: 'own_lobby_bra',
    imgBaseUrl: 'https://static.bet77s.com',
    isDownload: true,
  },
  'max9f': {
    path: 'own_lobby_bra999',
    imgBaseUrl: 'https://static.bet77s.com',
    isDownload: false,
  },
  'pg77': {
    path: 'own_lobby_bra977',
    imgBaseUrl: 'https://static.bet77s.com',
    isDownload: false,
  },
}

const GET_CHANNEL_DATA = () => {
  return CHANNEL_DATA[getPlatform()]
}

export { getImgPrefix, getPlatform, getApkUrl, GET_CHANNEL_DATA }
