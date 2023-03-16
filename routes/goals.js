const express = require("express")
const router = express.Router()

const {
  createGoal,
  getAllGoals,
  updateGoals,
  deleteGoal
} = require("../controllers/goals")

router.route("/create").post(createGoal)
router.route("/").get(getAllGoals)
router.route("/").patch(updateGoals)
router.route("/:id").delete(deleteGoal)

module.exports = router
