'use strict'

const classString = '.container {  width: 100%;  padding-right: 15px;}'
const complexClassString = '.block__element--modifier {  margin: 0 auto;}'
const typeString = 'a {  color: red;}'
const typeDescendentString = '.card > p {  font-size: 2.2rem;}'
const pseudoString1 = '.card:hover {  background: pink;}'
const pseudoString2 = '.boring-text::after {  content: " <- BORING";  color: red;}'
const idString = '#image {  border: 1px solid #ccc;}'
const attributeString = 'a[href*="example"] {  font-size: 2em;}'
const multipleSelectors = '.container-fluid, .container-sm, .container-md, .container-lg, .container-xl {  width: 100%;  padding-right: 15px;  padding-left: 15px;  margin-right: auto;  margin-left: auto;}'
const mediaQueryString = '@media (min-width: 576px) {  .container {    max-width: 540px;  }  .card {    padding: 1.25em;  }}'
const supportsString = '@supports (display: grid) {  .main {    display: grid;  }}'
const keyframesString = '@keyframes slidein {  from {    transform: translateX(0%);  }  to {    transform: translateX(100%);  }}'

module.exports = {
  classString,
  complexClassString,
  typeString,
  typeDescendentString,
  pseudoString1,
  pseudoString2,
  idString,
  attributeString,
  multipleSelectors,
  mediaQueryString,
  supportsString,
  keyframesString
}
