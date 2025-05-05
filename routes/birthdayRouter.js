const { Router } = require("express")
const { capitalize } = require('../utilities/strings')
const { linksVillagers } = require('../utilities/links')
const { months } = require('../utilities/dates')
const { getVillagersNamesWithBirthdaysInMonth } = require('../controllers/villagerController')

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
  
  const villagersNames = await getVillagersNamesWithBirthdaysInMonth(month.monthNumber)
  
  res.render("villagersBirthdays", { 
    title: `Birthdays in ${monthName}`, 
    // villagersNames, 
    capitalize, 
    links: linksVillagers, 
    firstLetters: [], 
    // subpath: `birthdays/${monthName}`,
    month 
  })
})

module.exports = birthdayRouter