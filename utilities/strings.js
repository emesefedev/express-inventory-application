const CustomNotValidError = require("../errors/CustomNotValidError")

function capitalize(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

function isSingleLetter(str) {
  const lowerStr = str.toLowerCase()
  return /^[a-z]$/.test(lowerStr) // prefer faster checking method. regex allocates an object into memory
}

function isValidLetter(letter) {
  const lowerLetter = letter.toLowerCase()
  
  if (!isSingleLetter(lowerLetter)) {
    throw new CustomNotValidError(`${letter} is not a valid letter`)
  }

  return lowerLetter
}

module.exports = {
  capitalize,
  isSingleLetter,
  isValidLetter
}