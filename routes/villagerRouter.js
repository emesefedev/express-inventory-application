const { Router } = require("express")
const { getVillagersNames, getVillagerByName } = require('../controllers/villagerController')
const { capitalize } = require('../utilities/strings')
const { formatDateToDDMM } = require('../utilities/dates')

const villagerRouter = Router()

villagerRouter.get("/", async (req, res) => {
  const villagersNames = await getVillagersNames()
  res.render("villagers", { title: "Villagers", villagersNames: villagersNames })
})

villagerRouter.get("/:villagerName", async (req, res) => {
  const { villagerName } = req.params;
  const villager = await getVillagerByName(villagerName)

  res.render("villagerInfo", { villager, capitalize, dateFormatter: formatDateToDDMM })
})

module.exports = villagerRouter