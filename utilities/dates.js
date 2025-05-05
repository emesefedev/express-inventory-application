const months = [
  { monthName: 'january', monthNumber: 1, totalDays: 31 },
  { monthName: 'february', monthNumber: 2, totalDays: 28 },
  { monthName: 'march', monthNumber: 3, totalDays: 31 },
  { monthName: 'april', monthNumber: 4, totalDays: 30 },
  { monthName: 'may', monthNumber: 5, totalDays: 31 },
  { monthName: 'june', monthNumber: 6, totalDays: 30 },
  { monthName: 'july', monthNumber: 7, totalDays: 31 },
  { monthName: 'august', monthNumber: 8, totalDays: 31 },
  { monthName: 'september', monthNumber: 9, totalDays: 30 },
  { monthName: 'october', monthNumber: 10, totalDays: 31 },
  { monthName: 'november', monthNumber: 11, totalDays: 30 },
  { monthName: 'december', monthNumber: 12, totalDays: 31 }
]

function formatDateToDDMM(date) {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${day}/${month}`
}

module.exports = {
  months,
  formatDateToDDMM
}