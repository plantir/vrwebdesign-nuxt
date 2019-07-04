export interface VRFormInput {
  type?:
    | 'checkbox'
    | 'currency'
    | 'datePicker'
    | 'fileUpload'
    | 'radio'
    | 'select'
    | 'textArea'
    | 'textField'
  model: string
  validation?: string | any
  ref?: string
  disabled?: string
  readonly?: string
  component?: string
  label?: string
  appendIcon: string
  prependIcon: string
  items: any[]
  suffix: string
  placeholder: string
}
export interface VRFormData {
  title?: string
  rows: VRFormInput[]
}
