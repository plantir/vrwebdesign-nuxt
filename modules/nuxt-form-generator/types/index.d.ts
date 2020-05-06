export interface VRFormInput {
  type?:
    | 'autocomplete'
    | 'comboBox'
    | 'checkbox'
    | 'currency'
    | 'datePicker'
    | 'timePicker'
    | 'fileUpload'
    | 'radio'
    | 'select'
    | 'textArea'
    | 'textField'
    | 'ckeditor'
  model: string
  validation?: string | any
  ref?: string
  disabled?: boolean
  readonly?: boolean
  component?: any
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
  select_text?: string
  select_value?: string | number
  upload_url?: string
  clearable?: boolean
  datePickerType?:
    | 'date'
    | 'datetime'
    | 'time'
    | 'year-month'
    | 'year'
    | 'month'
  [key: string]: any
}
export type VRFormData = {
  title?: string
  hide?: boolean
  rows: VRFormInput[]
}[]
