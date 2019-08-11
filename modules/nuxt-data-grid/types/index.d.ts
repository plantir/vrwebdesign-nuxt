export interface VRGridAction {
    title: string,
    cb: Function,
    icon?: string
}

export interface VRDataGrid {
    refresh: Function
}