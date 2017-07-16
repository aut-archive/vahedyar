class SheetsModel {
  constructor (sheet, sheets, options) {
    this.sheets = sheets
    this.options = options
    this.sheet = sheet
    this.columns = {}
  }

  async load () {
    let [headers] = await this.get('1:1', false)
    this.headers = headers
    return this
  }

  async append (values) {
    if (typeof values === 'object') {
      let _values = []
      // Match headers
      this.headers.forEach(h => {
        _values.push(values[h])
      })

      // New headers
      let newHeaders = Object.keys(values).filter(h => this.headers.indexOf(h) === -1)
      if (newHeaders.length) {
        newHeaders.forEach(h => {
          this.headers.push(h)
          _values.push(values[h])
        })
        await this.updateRow(this.headers, 1)
      }

      values = _values
    }

    return this.sheets('spreadsheets.values.append',
      {
        spreadsheetId: this.options.spreadsheetId,
        range: this.sheet,
        valueInputOption: 'RAW'
      },
      {
        majorDimension: 'ROWS',
        values: arr(values)
      })
  }

  async get (range, object = true) {
    let result = (await this.sheets('spreadsheets.values.get',
      {
        spreadsheetId: this.options.spreadsheetId,
        range: this.sheet + (range ? `!${range}` : '')
      }).then(r => r.values))

    if (!object) {
      return result
    }

    // Remove headers
    result.shift()

    return result.map(r => combine(r, this.headers))
  }

  update (values, range) {
    return this.sheets('spreadsheets.values.update',
      {
        spreadsheetId: this.options.spreadsheetId,
        range: this.sheet + (range ? `!${range}` : ''),
        valueInputOption: 'RAW'
      },
      {
        majorDimension: 'ROWS',
        values: arr(values)
      })
  }

  updateRow (values, rowIndex) {
    return this.update(values, `${rowIndex}:${rowIndex}`)
  }
}

function combine (values, keys) {
  let r = {}
  for (let i = 0; i < keys.length; i++) {
    r[keys[i]] = values[i]
  }
  return r
}

function arr (values) {
  if (!Array.isArray(values[0])) {
    return [values]
  }
  return values
}

module.exports = (...args) => {
  return new SheetsModel(...args).load()
}
