export interface VRGridAction {
    title: string,
    cb: Function,
    icon?: string
}

export interface VRDataGrid {
    refresh: Function
    items?: any[]
    total_items?: number
    lastPage?: number
}

// export interface VRGridPagination {
//     custom_class?: string
//     float?: 'right' | 'left'
// }