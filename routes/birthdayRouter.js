const { Router } = require("express")
const { capitalize } = require("../utilities/strings")
const { checkIsValidMonthName } = require("../utilities/dates")
const { linksVillagers } = require("../utilities/links")
const { months } = require("../utilities/dates")
const { getVillagersNamesWithBirthdaysInMonthPerDay } = require("../controllers/villagerController")

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

  const monthIndex = checkIsValidMonthName(monthName)

  const { villagersBirthdays, month } = await getVillagersNamesWithBirthdaysInMonthPerDay(monthIndex)
  
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