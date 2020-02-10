import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import validationMessages from 'vee-validate/dist/locale/fa'
import VueI18n from 'vue-i18n'
import moment from 'moment'
Validator.extend(
  'custom_after',
  {
    getMessage: (field, [target]) =>
      `The ${field} must be bigger than the ${target} field.`,
    validate: (value, ref) => {
      if (!ref[0]) {
        return true
      }
      let target = moment(ref[0])
      if (moment(value) > moment(ref[0])) {
        return true
      } else {
        return false
      }
    }
  },
  { hasTarget: true }
)
Validator.extend('mobile', {
  validate(value) {
    let mobile = /^[0][9][0-3|9][0-9]{8,8}$/g.exec(value)
    return mobile ? true : false
  }
})
Validator.extend('number', {
  validate(value) {
    let number = /\d/g.exec(value)
    return number ? true : false
  }
})
Validator.extend('sheba_number', {
  validate: value => {
    let sheba = /IR[0-9]{24}$/g.exec(value)
    return sheba ? true : false
  },
  getMessage: field => 'شماره شبا را به همراه IR و بدون خط فاصله وارد نمایید'
})
Validator.extend('nationalCode', {
  validate(value) {
    if (!value) {
      return true
    }
    if (
      !/^\d{10}$/.test(value) ||
      value === '0000000000' ||
      value === '1111111111' ||
      value === '2222222222' ||
      value === '3333333333' ||
      value === '4444444444' ||
      value === '5555555555' ||
      value === '6666666666' ||
      value === '7777777777' ||
      value === '8888888888' ||
      value === '9999999999'
    ) {
      return false
    }
    var check = parseInt(value[9], 0)
    var sum = 0
    var i
    for (i = 0; i < 9; ++i) {
      sum += parseInt(value[i], 0) * (10 - i)
    }
    sum %= 11
    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11)
  }
})
Validator.extend('phone', {
  validate(value) {
    let phone = /^[0-9]{11,11}$/g.exec(value)
    return phone ? true : false
  }
})
Validator.extend('postalCode', {
  validate(value) {
    let postalCode = /^[0-9]{10,10}$/g.exec(value)
    return postalCode ? true : false
  }
})

Vue.use(VueI18n)
const i18n = new VueI18n()
i18n.locale = 'fa' // set a default locale
validationMessages.messages.custom_after = validationMessages.messages.after

Vue.use(VeeValidate, {
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
    fa: validationMessages
  }
})
