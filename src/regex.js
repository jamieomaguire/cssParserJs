'use strict'

const getAllMatches = (regex, css) => {
  const matches = []
  let match;

  do {
    match = regex.exec(css)
    if (match && match[0] !== '.') {
      matches.push(match)
    }
  } while (match)

  return matches;
}

exports.getAllMatches = getAllMatches