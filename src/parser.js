'use strict'

const cssDeclaration = require('./models/cssDeclaration')
const cssItem = require('./models/cssItem')
const regex = require('./regex')

const cssPattern = /((?=@(.+?))(.+?)\{(.+?)\}\}|(.+?)\{(.+?)\})/g

const parse = (css) => {
  css = removeNewLines(css)
  return regex.getAllMatches(cssPattern, css).map(m => parseItem(m[0]))
}

const removeNewLines = (str) => {
  return str.replace(/\r\n/g, '')
}

const parseItem = (str) => {
  if (str[0] === '@') {
    return parseRule(str)
  }
  const selectorAndStyles = str.split('{')
  const declarations = parseDeclarations(selectorAndStyles[1])
  const item = new cssItem(selectorAndStyles[0].trim(), declarations)

  return item
}

const parseRule = (str) => {
  const selector = str.substring(0, str.indexOf('{')).trim()
  const nestedItemsStr = str.substring(str.indexOf('{') + 1, str.lastIndexOf('}'))
  const items = regex.getAllMatches(cssPattern, nestedItemsStr).map(m => parseItem(m[0]))
  const rule = new cssItem(selector, null, items)

  return rule
}

const parseDeclarations = (str) => {
  return str.replace('}', '').split(';').filter(i => i.trim()).map(s => {
    const cssPropertyAndValue = s.split(':')
    return new cssDeclaration(cssPropertyAndValue[0].trim(), cssPropertyAndValue[1].trim())
  })
}

exports.parse = parse