const names = [{name: "clara" }, { name: "berto" }, {name: "alfonso"}, {name: "claudio"}]
const firstLetters = [{firstletter: "clara" }, { firstletter: "berto" }, {firstletter: "alfonso"}, {firstletter: "claudio"}]

function getFirstLettersGivenNames(villagersNames) {
  return [...new Set(villagersNames.map(villager => villager.name.charAt(0)))]
    .map(letter => ({ firstletter: letter }))
}

module.exports = {
  getFirstLettersGivenNames
}