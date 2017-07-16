
const _transoformPersianMap = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9'
}

export const transoformPersian = v => Array.prototype.map.call(v, c => _transoformPersianMap[c] || c).join('')
