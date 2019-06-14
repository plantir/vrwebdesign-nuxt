import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
const dictionary = {
  en: {
    messages: {
      required: 'this field is required'
    }
  },
  fa: {
    messages: {
      required: 'وارد کردن این فیلد اجباری میباشد.',
      mobile: 'فرمت موبایل صحیح نمی باشد.',
      email: 'فرمت ایمیل صحیح نمی باشد.',
      nationalCode: 'کد ملی معتبر نمی باشد.',
      phone: 'فرمت شماره تلفن صحیح نمی باشد.',
      postalCode: 'کد پستی معتبر نمی باشد.',
      number: 'از اعداد انگلیسی استفاده کنید',
      digits: 'از اعداد انگلیسی استفاده کنید'
    }
  }
}
Validator.localize(dictionary)

Validator.extend('mobile', {
  validate(value) {
    let mobile = /^[0][9][0-3][0-9]{8,8}$/g.exec(value)
    return mobile ? true : false
  }
})
Validator.extend('number', {
  validate(value) {
    let number = /\d/g.exec(value)
    return number ? true : false
  }
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
Vue.use(VeeValidate, {
  locale: 'fa'
})
