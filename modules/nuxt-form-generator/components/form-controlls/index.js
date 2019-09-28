import autocomplete from './autocomplete.vue'
import comboBox from './comboBox.vue'
import checkbox from './checkbox.vue'
import currency from './currency.vue'
import datePicker from './datePicker.vue'
import timePicker from './timePicker.vue'
import fileUpload from './fileUpload.vue'
import radio from './radio.vue'
import select from './select.vue'
import textArea from './textArea.vue'
import textField from './textField.vue'

let items = {
  'vr-autocomplete': autocomplete,
  'vr-comboBox': comboBox,
  'vr-checkbox': checkbox,
  'vr-currency': currency,
  'vr-datePicker': datePicker,
  'vr-timePicker': timePicker,
  'vr-fileUpload': fileUpload,
  'vr-radio': radio,
  'vr-select': select,
  'vr-textArea': textArea,
  'vr-textField': textField
}
export default items
