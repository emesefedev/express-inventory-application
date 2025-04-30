const { Router } = require("express")
const { getVillagersNames } = require('../controllers/villagerController')

const villagerRouter = Router()

villagerRouter.get("/", async (req, res) => {
  const villagersNames = await getVillagersNames()
  res.render("villagers", { title: "Villagers", villagersNames: villagersNames })
})

villagerRouter.get("/:villagerName", (req, res) => {
  const { villagerName } = req.params;
  res.send(`Villager Name: ${villagerName}`);
});

module.exports = villagerRouter