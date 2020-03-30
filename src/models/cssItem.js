'use strict'

module.exports = class CSSItem {
  constructor(selector, declarations = [], nestedItems = []) {
    this.selector = selector
    this.declarations = declarations
    this.nestedItems = nestedItems
  }
}