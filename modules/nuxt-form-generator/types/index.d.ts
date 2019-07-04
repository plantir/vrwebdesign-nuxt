interface VRFormInput {
  title?: string
  model: string
  validation?: string | any
  ref?: string
  disabled?: string
  readonly?: string
  component?: string
  label?: string
}
type VRFormData = VRFormInput[]
