const Goopi = require('./lib/goopi')
const SheetsModel = require('./lib/sheets-model')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('../config')

const app = express()
app.use(bodyParser.json())

let courses = []
let updateCourses = () => {}
let submitApplicant = () => {}

const allowedStates = ['r', 'o', '']

Goopi({
  jwt: config.jwt,
  scope: [
    'https://www.googleapis.com/auth/spreadsheets'
  ]
}).then(async goopi => {
  console.log('[api] Google API Initalized')

  const sheets = goopi.service('sheets', 'v4')
  const options = {
    spreadsheetId: config.spreadsheetId
  }

  const Applicants = await SheetsModel('applicants', sheets, options)
  const Courses = await SheetsModel('courses', sheets, options)

  updateCourses = async () => {
    courses = await Courses.get()
  }
  await updateCourses()

  submitApplicant = async form => {
    let row = {
      stdNumber: form.stdNumber,
      nationalNumber: form.nationalNumber,
      semester: form.semester,
      entry: form.entry
    }

    let availableCourses = courses.map(c => c.course)

    Object.keys(form.courses || {}).forEach(course => {
      if (availableCourses.indexOf[course] === -1 ||
         allowedStates.indexOf[form.courses[course].state] === -1) {
        return
      }
      row[course] = form.courses[course].state
    })

    await Applicants.append(row)
  }
}).catch(console.error)

app.get('/update', async (req, res) => {
  await updateCourses()
  res.end('ok')
})

app.get('/courses', (req, res) => {
  res.json(courses)
})

app.post('/submit', async (req, res) => {
  await submitApplicant(req.body)
  res.end('ok')
})

module.exports = {
  path: '/api',
  handler: app
}
