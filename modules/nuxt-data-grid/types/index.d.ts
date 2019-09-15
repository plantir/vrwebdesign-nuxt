export interface VRGridAction {
    title: string,
    cb: Function,
    icon?: string
}

export interface VRDataGrid {
    refresh: Function
}

export interface VRGridFilter {
    model: string
    size?: number
    type?: string
    icon: string
    label: string
    name?:string
    items?:any[]
}