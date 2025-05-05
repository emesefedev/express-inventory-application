const months = [
  'january', 'february', 'march', 
  'april', 'may', 'june', 
  'july', 'august', 'september', 
  'october', 'november', 'december']

function formatDateToDDMM(date) {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${day}/${month}`
}

module.exports = {
  months,
  formatDateToDDMM
}