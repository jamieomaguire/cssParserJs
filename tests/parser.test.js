'use strict'

const parser = require('../src/parser')
const cssStrings = require('./css-strings')

describe('parser module', () => {
  test('parse - class selector', () => {
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

  test('parse - class selector - multiple', () => {
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

  test('parse - complex class selector', () => {
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

  test('parse - complex class selector - multiple', () => {
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

  test('parse - type selector', () => {
    const str = 'a {  color: red;}'
    const expected = [{
      selector: 'a',
      declarations: [
        {
          property: 'color',
          value: 'red'
        }
      ]
    }]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - type selector - multiple', () => {
    const str = 'a {  color: red;}p {  font-size: 2.2rem;}'
    const expected = [
      {
        selector: 'a',
        declarations: [
          {
            property: 'color',
            value: 'red'
          }
        ]
      },
      {
        selector: 'p',
        declarations: [
          {
            property: 'font-size',
            value: '2.2rem'
          }
        ]
      }
    ]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - pseudo selector', () => {
    const str = '.card:hover {  background: pink;}'
    const expected = [{
      selector: '.card:hover',
      declarations: [
        {
          property: 'background',
          value: 'pink'
        }
      ]
    }]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - pseudo selector - multiple', () => {
    const str = '.card:hover {  background: pink;}.boring-text::after {  content: " <- BORING";  color: red;}'
    const expected = [
      {
        selector: '.card:hover',
        declarations: [
          {
            property: 'background',
            value: 'pink'
          }
        ]
      },
      {
        selector: '.boring-text::after',
        declarations: [
          {
            property: 'content',
            value: '\" <- BORING\"'
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

  test('parse - id selector', () => {
    const str = '#image {  border: 1px solid #ccc;}'
    const expected = [{
      selector: '#image',
      declarations: [
        {
          property: 'border',
          value: '1px solid #ccc'
        }
      ]
    }]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - id selector - multiple', () => {
    const str = '#image {  border: 1px solid #ccc;}#login {  padding: 20px;}'
    const expected = [
      {
        selector: '#image',
        declarations: [
          {
            property: 'border',
            value: '1px solid #ccc'
          }
        ]
      },
      {
        selector: '#login',
        declarations: [
          {
            property: 'padding',
            value: '20px'
          }
        ]
      }
    ]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - attribute selector', () => {
    const str = 'a[href*="example"] {  font-size: 2em;}'
    const expected = [{
      selector: 'a[href*="example"]',
      declarations: [
        {
          property: 'font-size',
          value: '2em'
        }
      ]
    }]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - attribute selector - multiple', () => {
    const str = 'a[href*="example"] {  font-size: 2em;}ol[type="a" s] {  list-style-type: lower-alpha;}'
    const expected = [
      {
        selector: 'a[href*="example"]',
        declarations: [
          {
            property: 'font-size',
            value: '2em'
          }
        ]
      },
      {
        selector: 'ol[type="a" s]',
        declarations: [
          {
            property: 'list-style-type',
            value: 'lower-alpha'
          }
        ]
      }
    ]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - multiple selectors for one set of declarations', () => {
    const str = '.container-fluid, .container-sm, .container-md, .container-lg, .container-xl {  width: 100%;  padding-right: 15px;}'
    const expected = [{
      selector: '.container-fluid, .container-sm, .container-md, .container-lg, .container-xl',
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
})