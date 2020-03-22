const countryRegex = require('country-regex')

function removeEmojis (s) {
  return s.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/gmi, '')
}

function getCountryCode (c) {
  c = removeEmojis(c).trim()
  let code = null
  for (const k in countryRegex) {
    const reg = new RegExp(countryRegex[k], 'gmi')
    if (reg.test(c)) {
      code = k
      break
    }
  }
  if (!code) {
    if (c === 'CD') code = 'COD'
    if (c === 'Saint Martin') code = 'SXM'
    if (c === 'Diamond Princess') code = 'XDP'
    if (c === 'Channel Islands') code = 'XCI'
  }
  if (!code) console.log('[WARN] No code found for country: ' + c)
  return code
}

module.exports = {
  removeEmojis,
  getCountryCode
}
