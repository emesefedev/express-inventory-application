const { Router } = require("express")
const { capitalize } = require('../utilities/strings')
const { linksVillagers } = require('../utilities/links')
const { months } = require('../utilities/dates')
const { 
  getVillagersNamesWithBirthdaysInMonth,
  getVillagersNamesWithBirthdaysInDate
 } = require('../controllers/villagerController')

const birthdayRouter = Router()

birthdayRouter.get("/", async (req, res) => {  
  res.render("birthdays", { 
    title: "Birthdays",  
    capitalize, 
    links: linksVillagers,
    months
  })
})

birthdayRouter.get("/:monthName", async (req, res) => {
  const { monthName } = req.params
  const monthIdx = months.findIndex(m => m.monthName === monthName)
  const month = months[monthIdx]

  const villagersBirthdays = {}
  for (let d = 1; d <= month.totalDays; d++) {
    villagersBirthdays[d] = await getVillagersNamesWithBirthdaysInDate(month.monthNumber, d)
  }
  
  res.render("villagersBirthdays", { 
    title: `Birthdays in ${monthName}`, 
    capitalize, 
    links: linksVillagers, 
    firstLetters: [], 
    month,
    villagersBirthdays
  })
})

module.exports = birthdayRouter