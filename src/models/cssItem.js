'use strict'

module.exports = class CSSItem {
  constructor(selector, declarations = []) {
    this.selector = selector
    this.declarations = declarations
  }
}