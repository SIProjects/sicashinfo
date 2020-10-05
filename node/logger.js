const colors = require('colors/safe')

class Logger {
  #formatting = true

  constructor({formatting = true} = {}) {
    this.#formatting = formatting
  }

  info(...args) {
    this._log('blue', 'info', ...args)
  }

  error(...args) {
    this._log('red', 'error', ...args)
  }

  debug(...args) {
    if (process.env.SICASHINFO_ENV === 'debug') {
      this._log('green', 'debug', ...args)
    }
  }

  warn(...args) {
    this._log('yellow', 'warn', ...args)
  }

  _log(color, level, ...args) {
    if (this.#formatting) {
      let date = new Date()
      let typeString = colors[color].italic(`${level}:`)
      args.unshift(`[${date.toISOString()}]`, typeString)
    }
    console[level === 'error' ? 'error' : 'log'](...args)
  }
}

module.exports = Logger
