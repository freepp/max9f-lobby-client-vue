export interface CategoryInfo {
    title: string
    templateType: number
    categoryItems: any
}

export interface FormItemConfig {
    key: string
    label: string
    placeholder: string
    required: boolean
    type: string
    cypto: boolean
    dark?: boolean
    relative?: string
}
