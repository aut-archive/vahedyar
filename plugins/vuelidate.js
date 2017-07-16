import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Codemeli from 'codemeli'
import { withParams } from 'vuelidate/lib/validators/common'

Vue.use(Vuelidate)

export const codemeli = withParams({ type: 'codemeli' }, value => !!Codemeli(value))

export const stdNumber = withParams({ type: 'stdNumber' }, str => {
  if (!str || str === '') return false
  str = String(str)
  let m = /[1-9][0-9]{5,}/.exec(String(str))

  if (!m || !m[0]) return false
  let stdNumber = m[0]

  // Verify year
  let year = parseInt(stdNumber.substr(0, 2))
  if (year < 60) return false

  return !!stdNumber
})
