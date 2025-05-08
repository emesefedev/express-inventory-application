function getFirstLettersGivenNames(villagersNames) {
  return [...new Set(villagersNames.map(villager => villager.name.charAt(0)))]
    .map(letter => ({ firstletter: letter }))
}

module.exports = {
  getFirstLettersGivenNames
}