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
    months,
    links: linksVillagers 
  })
})

birthdayRouter.get("/:monthName", async (req, res) => {
  const { monthName } = req.params;
  const month = months.indexOf(monthName) + 1;
  
  const villagersNames = await getVillagersNamesWithBirthdaysInMonth(month)
  
  res.render("villagers", { 
    title: `Birthdays in ${monthName}`, 
    villagersNames, 
    capitalize, 
    links: linksVillagers, 
    firstLetters: [], 
    subpath: `birthdays/${monthName}` 
  })
})

module.exports = birthdayRouter