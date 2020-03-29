'use strict'

const cssDeclaration = require('./models/cssDeclaration')
const cssItem = require('./models/cssItem')
const regex = require('./regex')

const parse = (css) => {
  css = removeNewLines(css)
  const cssPattern = /((?=@(.+?))(.+?)\{(.+?)\}\}|(.+?)\{(.+?)\})/g
  // console.log(regex.getAllMatches(cssPattern, css))
  return regex.getAllMatches(cssPattern, css).map(m => parseItems(m[0]))
}

const removeNewLines = (str) => {
  return str.replace(/\r\n/g, '')
}

const parseItems = (str) => {
  const selectorAndStyles = str.split('{')
  const declarations = parseDeclarations(selectorAndStyles[1])
  const item = new cssItem(selectorAndStyles[0].trim(), declarations)

  return item
}

const parseDeclarations = (str) => {
  return str.replace('}','').split(';').filter(i => i).map(s => {
    const cssPropertyAndValue = s.split(':')
    return new cssDeclaration(cssPropertyAndValue[0].trim(), cssPropertyAndValue[1].trim())
  })
}

exports.parse = parse