export interface VRFormInput {
  type?:
    | 'autocomplete'
    | 'commboBox'
    | 'checkbox'
    | 'currency'
    | 'datePicker'
    | 'timePicker'
    | 'fileUpload'
    | 'radio'
    | 'select'
    | 'textArea'
    | 'textField'
  model: string
  validation?: string | any
  ref?: string
  disabled?: boolean
  readonly?: boolean
  component?: string
  label?: string
  appendIcon?: string
  prependIcon?: string
  items?: any[]
  suffix?: string
  placeholder?: string
  multiple?: boolean
  chips?: boolean
  async?: boolean
  queryService?: Function
  returnObject?: boolean
  inputType?: string
  browserAutocomplete?: string
  hint?: string
  hide?: boolean
  onChange?: Function
  is_object?: boolean
  image_src?: string
  is_default?: boolean
}
export type VRFormData = {
  title?: string
  hide?: boolean
  rows: VRFormInput[]
}[]
