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
      ],
      nestedItems: []
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
        ],
        nestedItems: []
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
        ],
        nestedItems: []

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
      ],
      nestedItems: []

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
        ],
        nestedItems: []

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
        ],
        nestedItems: []

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
      ],
      nestedItems: []

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
        ],
        nestedItems: []

      },
      {
        selector: 'p',
        declarations: [
          {
            property: 'font-size',
            value: '2.2rem'
          }
        ],
        nestedItems: []

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
      ],
      nestedItems: []

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
        ],
        nestedItems: []

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
        ],
        nestedItems: []

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
      ],
      nestedItems: []

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
        ],
        nestedItems: []

      },
      {
        selector: '#login',
        declarations: [
          {
            property: 'padding',
            value: '20px'
          }
        ],
        nestedItems: []

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
      ],
      nestedItems: []

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
        ],
        nestedItems: []

      },
      {
        selector: 'ol[type="a" s]',
        declarations: [
          {
            property: 'list-style-type',
            value: 'lower-alpha'
          }
        ],
        nestedItems: []

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
      ],
      nestedItems: []

    }]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - media query', () => {
    const str = '@media (min-width: 576px) {  .container {    max-width: 540px;  }  .card {    padding: 1.25em;  }}'
    const expected = [{
      selector: "@media (min-width: 576px)",
      declarations: null,
      nestedItems: [
        {
          selector: ".container",
          declarations: [
            {
              property: "max-width",
              value: "540px"
            }
          ],
          nestedItems: []
        },
        {
          selector: ".card",
          declarations: [
            {
              property: "padding",
              value: "1.25em"
            }
          ],
          nestedItems: []
        }
      ]
    }]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - media query - multiple', () => {
    const str = '@media (min-width: 576px) {  .container {    max-width: 540px;  }  .card {    padding: 1.25em;  }}@media (min-width: 900px) {  .container {    max-width: 700px;  }  .card {    padding: 2.25em;  }}'
    const expected = [
      {
        selector: "@media (min-width: 576px)",
        declarations: null,
        nestedItems: [
          {
            selector: ".container",
            declarations: [
              {
                property: "max-width",
                value: "540px"
              }
            ],
            nestedItems: []
          },
          {
            selector: ".card",
            declarations: [
              {
                property: "padding",
                value: "1.25em"
              }
            ],
            nestedItems: []
          }
        ]
      },
      {
        selector: "@media (min-width: 900px)",
        declarations: null,
        nestedItems: [
          {
            selector: ".container",
            declarations: [
              {
                property: "max-width",
                value: "700px"
              }
            ],
            nestedItems: []
          },
          {
            selector: ".card",
            declarations: [
              {
                property: "padding",
                value: "2.25em"
              }
            ],
            nestedItems: []
          }
        ]
      }
    ]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - supports rule', () => {
    const str = '@supports (display: grid) {  .main {    display: grid;  }}'
    const expected = [{
      selector: "@supports (display: grid)",
      declarations: null,
      nestedItems: [
        {
          selector: ".main",
          declarations: [
            {
              property: "display",
              value: "grid"
            }
          ],
          nestedItems: []
        }
      ]
    }]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - supports rule - multiple', () => {
    const str = '@supports (display: grid) {  .main {    display: grid;  }}@supports not (display: grid) {  .main {    display: flex;  }}'
    const expected = [
      {
        selector: "@supports (display: grid)",
        declarations: null,
        nestedItems: [
          {
            selector: ".main",
            declarations: [
              {
                property: "display",
                value: "grid"
              }
            ],
            nestedItems: []
          }
        ]
      },
      {
        selector: "@supports not (display: grid)",
        declarations: null,
        nestedItems: [
          {
            selector: ".main",
            declarations: [
              {
                property: "display",
                value: "flex"
              }
            ],
            nestedItems: []
          }
        ]
      }
    ]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - keyframes rule', () => {
    const str = '@keyframes slidein {  from {    transform: translateX(0%);  }  to {    transform: translateX(100%);  }}'
    const expected = [{
      selector: "@keyframes slidein",
      declarations: null,
      nestedItems: [
        {
          selector: "from",
          declarations: [
            {
              property: "transform",
              value: "translateX(0%)"
            }
          ],
          nestedItems: []
        },
        {
          selector: "to",
          declarations: [
            {
              property: "transform",
              value: "translateX(100%)"
            }
          ],
          nestedItems: []
        }
      ]
    }]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

  test('parse - keyframes rule - multiple', () => {
    const str = '@keyframes slidein {  from {    transform: translateX(0%);  }  to {    transform: translateX(100%);  }}@keyframes slideout {  from {    transform: translateX(100%);  }  to {    transform: translateX(0%);  }}'
    const expected = [
      {
        selector: "@keyframes slidein",
        declarations: null,
        nestedItems: [
          {
            selector: "from",
            declarations: [
              {
                property: "transform",
                value: "translateX(0%)"
              }
            ],
            nestedItems: []
          },
          {
            selector: "to",
            declarations: [
              {
                property: "transform",
                value: "translateX(100%)"
              }
            ],
            nestedItems: []
          }
        ]
      },
      {
        selector: "@keyframes slideout",
        declarations: null,
        nestedItems: [
          {
            selector: "from",
            declarations: [
              {
                property: "transform",
                value: "translateX(100%)"
              }
            ],
            nestedItems: []
          },
          {
            selector: "to",
            declarations: [
              {
                property: "transform",
                value: "translateX(0%)"
              }
            ],
            nestedItems: []
          }
        ]
      }
    ]

    const result = parser.parse(str)

    expect(result).toEqual(expected)
  })

})