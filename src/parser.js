'use strict'

const cssDeclaration = require('./models/cssDeclaration')
const cssItem = require('./models/cssItem')
const regex = require('./regex')

const parse = (css) => {
  css = removeNewLines(css)
  const cssPattern = /((?=@(.+?))(.+?)\{(.+?)\}\}|(.+?)\{(.+?)\})/g
  // console.log(regex.getAllMatches(cssPattern, css))
  return regex.getAllMatches(cssPattern, css).map(m => parseItem(m[0]))
}

const removeNewLines = (str) => {
  return str.replace(/\r\n/g, '')
}

const parseItem = (str) => {
  if (str[0] === '@') {
    console.log('we have an @ rule! branching off...')
    return parseRule(str)
  } 
  const selectorAndStyles = str.split('{')
  const declarations = parseDeclarations(selectorAndStyles[1])
  const item = new cssItem(selectorAndStyles[0].trim(), declarations)

  return item
}

const parseRule = (str) => {
  console.log(str)
}

const parseDeclarations = (str) => {
  return str.replace('}','').split(';').filter(i => i).map(s => {
    const cssPropertyAndValue = s.split(':')
    return new cssDeclaration(cssPropertyAndValue[0].trim(), cssPropertyAndValue[1].trim())
  })
}

exports.parse = parse