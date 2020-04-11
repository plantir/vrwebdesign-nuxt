import Vue from 'vue'
import * as moment from 'moment-jalaali'

Vue.filter('currency', (value) => {
  if (typeof value !== 'number') {
    return value
  }
  return new Intl.NumberFormat().format(value)
})

Vue.filter('persianDigit', (value) => {
  if (value || value === 0) {
    return value.toString().replace(/\d+/g, function (digit) {
      var enDigitArr = [],
        peDigitArr = []
      for (var i = 0; i < digit.length; i++) {
        enDigitArr.push(digit.charCodeAt(i))
      }
      for (var j = 0; j < enDigitArr.length; j++) {
        peDigitArr.push(
          String.fromCharCode(
            enDigitArr[j] + (!!value && value === true ? 1584 : 1728)
          )
        )
      }
      return peDigitArr.join('')
    })
  } else {
    return value
  }
})

Vue.filter('persianDate', (value, format, locale) => {
  let time = value
  if (locale) {
    moment.locale(locale)
  }
  try {
    time = moment(value).format(format || 'jYYYY/jM/jD')
  } catch (error) {}
  return time
})
Vue.filter('day', (value) => {
  let day
  switch (value) {
    case 'Sa':
      day = 'شنبه'
      break
    case 'Su':
      day = 'یکشنبه'
      break
    case 'Mo':
      day = 'دوشنبه'
      break
    case 'Tu':
      day = 'سه‌شنبه'
      break
    case 'We':
      day = 'چهارشنبه'
      break
    case 'Th':
      day = 'پنجشنبه'
      break
    case 'Fr':
      day = 'جمعه'
      break
  }
  return day
})
Vue.filter('characterDigit', (value) => {
  if (!value) {
    return
  }
  let spliter = ' و '
  let zero = 'صفر'
  let Letters = [
    ['', 'یك', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
    [
      'ده',
      'یازده',
      'دوازده',
      'سیزده',
      'چهارده',
      'پانزده',
      'شانزده',
      'هفده',
      'هجده',
      'نوزده',
      'بیست',
    ],
    ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
    [
      '',
      'یكصد',
      'دویست',
      'سیصد',
      'چهارصد',
      'پانصد',
      'ششصد',
      'هفتصد',
      'هشتصد',
      'نهصد',
    ],
    [
      '',
      ' هزار ',
      ' میلیون ',
      ' میلیارد ',
      ' بیلیون ',
      ' بیلیارد ',
      ' تریلیون ',
      ' تریلیارد ',
      ' کوآدریلیون ',
      ' کادریلیارد ',
      ' کوینتیلیون ',
      ' کوانتینیارد ',
      ' سکستیلیون ',
      ' سکستیلیارد ',
      ' سپتیلیون ',
      ' سپتیلیارد ',
      ' اکتیلیون ',
      ' اکتیلیارد ',
      ' نانیلیون ',
      ' نانیلیارد ',
      ' دسیلیون ',
      ' دسیلیارد ',
    ],
  ]
  /**
   * Clear number and split to 3th sections
   * @param {*} value
   */
  function PrepareNumber(value) {
    if (typeof value === 'number') {
      value = value.toString()
    }
    let NumberLength = value.length % 3
    if (NumberLength === 1) {
      value = '00' + value
    } else if (NumberLength === 2) {
      value = '0' + value
    }
    //Explode to array
    return value.replace(/\d{3}(?=\d)/g, '$&*').split('*')
  }

  /**
   * Convert 3 numbers into letter
   * @param {*} value
   */
  function ThreeNumbersToLetter(value) {
    //return zero
    if (parseInt(value) === 0) {
      return ''
    }
    let parsedInt = parseInt(value)
    if (parsedInt < 10) {
      return Letters[0][parsedInt]
    }
    if (parsedInt <= 20) {
      return Letters[1][parsedInt - 10]
    }
    if (parsedInt < 100) {
      let one = parsedInt % 10
      let ten = (parsedInt - one) / 10
      if (one > 0) {
        return Letters[2][ten] + spliter + Letters[0][one]
      }
      return Letters[2][ten]
    }
    let one = parsedInt % 10
    let hundreds = (parsedInt - (parsedInt % 100)) / 100
    let ten = (parsedInt - (hundreds * 100 + one)) / 10
    let out = [Letters[3][hundreds]]
    let SecendPart = ten * 10 + one
    if (SecendPart > 0) {
      if (SecendPart < 10) {
        out.push(Letters[0][SecendPart])
      } else if (SecendPart <= 20) {
        out.push(Letters[1][SecendPart - 10])
      } else {
        out.push(Letters[2][ten])
        if (one > 0) {
          out.push(Letters[0][one])
        }
      }
    }
    return out.join(spliter)
  }
  //return zero
  if (parseInt(value) === 0) {
    return zero
  }
  if (value.length > 66) {
    return 'خارج از محدوده'
  }
  //Split to sections
  let SplitedNumber = PrepareNumber(value)

  //Fetch Sections and convert
  let funcout = []
  let SplitLength = SplitedNumber.length
  for (let i = 0; i < SplitLength; i++) {
    let SectionTitle = Letters[4][SplitLength - (i + 1)]
    let converted = ThreeNumbersToLetter(SplitedNumber[i])
    if (converted !== '') {
      funcout.push(converted + SectionTitle)
    }
  }
  return funcout.join(spliter)
})
