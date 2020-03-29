'use strict'
const fs = require('fs')
const parser = require('./src/parser')

const read = (filePath) => {
  return new Promise((res, rej) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      const result = parser.parse(data)
      if (error) {
        rej(Error('Something awful has happened: ' + error.message))
      }

      res(result)
    })
  })
}

read('./test.css')