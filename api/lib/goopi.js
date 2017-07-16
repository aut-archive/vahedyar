const {writeJson, existsSync} = require('fs-extra')
const {resolve} = require('path')
const readline = require('readline')
const google = require('googleapis')
const pify = require('pify')

class Goopi {

  constructor (options) {
    this.options = options
    this.rootDir = options.rootDir || resolve(__dirname, '..')
    this.tokenFile = options.tokenFile || resolve(this.rootDir, 'google-token.json')
  }

  async init () {
    if (this.options.oauth2) {
      this.auth = await this.OAuth2Authorize(this.options.oauth2)
    } else if (this.options.jwt) {
      this.auth = await this.JWTAuthorize(this.options.jwt)
    } else if (this.options.token) {
      this.auth = this.options.token
    }

    return this
  }

  async JWTAuthorize (key) {
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null, // keyfile
      key.private_key,
      this.options.scope,
      null // subject
    )

    return new Promise((resolve, reject) => {
      jwtClient.authorize((err, tokens) => {
        if (err) {
          return reject(err)
        }
        resolve(jwtClient)
      })
    })
  }

  async OAuth2Authorize (credentials, forceRenew = false) {
    const clientSecret = credentials.installed.client_secret
    const clientId = credentials.installed.client_id
    const redirectUrl = credentials.installed.redirect_uris[0]
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl)

    // Check if we have previously stored a token.
    if (forceRenew || !existsSync(this.token_file)) {
      // Get and store new token after prompting for user authorization
      const authUrl = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.options.scope
      })

      console.log('Authorize this app by visiting this url: ', authUrl)

      return new Promise((resolve, reject) => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
        rl.question('Enter the code from that page here: ', code => {
          rl.close()
          oauth2Client.getToken(code, async (err, token) => {
            if (err) {
              console.log('Error while trying to retrieve access token')
              return reject(err)
            }

            oauth2Client.setCredentials(token)

            // Store token to disk be used in later program executions.
            await writeJson(this.tokenFile, token)
            console.log('Token stored to ' + this.tokenFile)

            resolve(oauth2Client)
          })
        })
      })
    }
  }

  service (service, opts) {
    const _opts = Object.assign({
      auth: this.auth
    }, typeof opts === 'string' ? { version: opts } : opts)

    const instance = google[service](_opts)

    return (method, opts, resource) => {
      const s = method.split('.')
      let m = instance
      while (s.length) {
        m = m[s.shift()]
      }
      if (resource) {
        opts.resource = Object.assign({}, opts.resource, resource)
      }
      return pify(m)(opts)
    }
  }

}

module.exports = (...args) => {
  return new Goopi(...args).init()
}
