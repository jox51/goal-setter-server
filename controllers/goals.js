// import model/schema to initiate actions
const Goal = require("../models/goal")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors")

const createGoal = async (req, res) => {
  req.body.data.createdBy = req.user.userId
  req.body.data.name = req.user.name

  const goal = await Goal.create(req.body.data)

  res.status(200).json({ goal })
}

const getAllGoals = async (req, res) => {
  const goals = await Goal.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  )
  res.status(StatusCodes.OK).json({ goals, count: goals.length })
}

const updateGoals = async (req, res) => {
  const { targetGoal, targetDate } = req.body.data
  const { goalId } = req.body
  const { userId } = req.user

  if (targetGoal === "" || targetDate === "") {
    throw new BadRequestError("Goal and Date Fields cannot be empty")
  }

  const goal = await Goal.findByIdAndUpdate(
    {
      _id: goalId,
      createdBy: userId
    },
    { targetGoal, targetDate },
    { new: true, runValidators: true }
  )
  if (!goal) {
    throw new NotFoundError(`No job with id ${goalId}`)
  }

  //return current goals after update
  const goals = await Goal.find({ createdBy: userId }).sort("createdAt")

  res.status(StatusCodes.OK).json({ goals })
}

const deleteGoal = async (req, res) => {
  const {
    user: { userId },
    params: { id: goalId }
  } = req

  console.log(req)

  const goal = await Goal.findByIdAndRemove({ _id: goalId, createdBy: userId })

  if (!goal) {
    throw new NotFoundError(`No goal with id ${goalId}`)
  }

  const goals = await Goal.find({ createdBy: userId }).sort("createdAt")

  res.status(200).json({ goals })
}

module.exports = {
  createGoal,
  getAllGoals,
  updateGoals,
  deleteGoal
}
