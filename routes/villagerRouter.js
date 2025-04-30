const { Router } = require("express");

const villagerRouter = Router();

villagerRouter.get("/", (req, res) => res.send("All villagers"));
villagerRouter.get("/:villagerName", (req, res) => {
  const { villagerName } = req.params;
  res.send(`Villager Name: ${villagerName}`);
});

module.exports = villagerRouter;