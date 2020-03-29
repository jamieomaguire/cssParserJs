'use strict'

const parser = require('../src/parser')
const cssStrings = require('./css-strings')

describe('parser module', () => {
  test('parse - correctly parses a class rule', () => {
    const str = '.container {  width: 100%;  padding-right: 15px;}'
    const expected = [{
      selector: '.container',
      declarations: [
        {
          property: 'width',
          value: '100%'
        },
        {
          property: 'padding-right',
          value: '15px'
        }
      ]
    }]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - correctly parses multiple class rules', () => {
    const str = '.container {  width: 100%;  padding-right: 15px;}.card {  margin: 10px;  color: red;}'
    const expected = [
      {
        selector: '.container',
        declarations: [
          {
            property: 'width',
            value: '100%'
          },
          {
            property: 'padding-right',
            value: '15px'
          }
        ]
      },
      {
        selector: '.card',
        declarations: [
          {
            property: 'margin',
            value: '10px'
          },
          {
            property: 'color',
            value: 'red'
          }
        ]
      }
    ]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - correctly parses a complex class rule', () => {
    const str = '.block__element--modifier {  width: 100%;  padding-right: 15px;}'
    const expected = [{
      selector: '.block__element--modifier',
      declarations: [
        {
          property: 'width',
          value: '100%'
        },
        {
          property: 'padding-right',
          value: '15px'
        }
      ]
    }]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - correctly parses multiple complex class rules', () => {
    const str = '.block__element--modifier1 {  width: 100%;  padding-right: 15px;}.block__element--modifier2 {  margin: 10px;  color: red;}'
    const expected = [
      {
        selector: '.block__element--modifier1',
        declarations: [
          {
            property: 'width',
            value: '100%'
          },
          {
            property: 'padding-right',
            value: '15px'
          }
        ]
      },
      {
        selector: '.block__element--modifier2',
        declarations: [
          {
            property: 'margin',
            value: '10px'
          },
          {
            property: 'color',
            value: 'red'
          }
        ]
      }
    ]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })
})