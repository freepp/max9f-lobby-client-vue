// 活动开关,活动结束后关闭
export const IS_ACTIVITY_SWITCH = true

// 圣诞节活动要替换的资源
const popup_register_halloween = 'halloween.jpg'
const halloweenActivityFiles = {
    home_spine_left: "premio",
    home_spine_right: "dt_share",
    popup_register_locro777: popup_register_halloween,
    popup_register_forroubet: popup_register_halloween,
    popup_register_jogo10br: popup_register_halloween,
    popup_register_suavegame: popup_register_halloween,
    popup_register_sorte10: popup_register_halloween,
    popup_register_vitoria365: popup_register_halloween,
    popup_register_nologo: popup_register_halloween,
    download_bg: "new_bg-halloween.jpg",
    download_btn: "btn-halloween.png",
    download_center: "new_center-halloween.png",
    download_sub: "new_sub-halloween.png",
    download_subjogo: "new_sub-halloween.png",
    bind_mobile_banner: "bind_mobile_banner_halloween.jpg"
}

const fileJson = {
    default: {
        home_spine_left: "banner_spine",
        home_spine_right: "banner_gengduohuodong_spine",
        popup_register_locro777: "lucro777.jpg",
        popup_register_forroubet: "forroubet.jpg",
        popup_register_jogo10br: "jogo10br.jpg",
        popup_register_suavegame: "suavegame.jpg",
        popup_register_sorte10: "sorte10.jpg",
        popup_register_vitoria365: "vitoria365.jpg",
        popup_register_nologo: "no_logo.jpg",
        download_bg: "bj.jpg",
        download_btn: "btn.png",
        download_center: "center.png",
        download_sub: "sub.png",
        download_subjogo: "sub-jogo.png",
        bind_mobile_banner: "bind_mobile_banner.png"
    },
    activity: {
        ...halloweenActivityFiles
    }
}

const prefix = IS_ACTIVITY_SWITCH ? "activity" : "default"

export const getActivityAsset = (name: string) => fileJson[prefix][name]
