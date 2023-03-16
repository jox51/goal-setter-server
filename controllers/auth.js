const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/user")

const register = async (req, res) => {
  const { name, email, password } = req.body.data.user
  const user = await User.create({ ...req.body.data.user })

  res.status(200).json({ msg: "User created successfully" })
}
const login = async (req, res) => {
  const { email, password } = req.body.data.user
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ msg: "Username is incorrect" })
  }

  // compares password with db. Calls fx created in the schema
  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    return res.status(400).json({ msg: "password is incorrect" })
  }

  // creates jwt token, sends token back to client
  const token = user.createJWT()
  res.status(200).json({ user: user.name, token, msg: "login success" })
}

module.exports = {
  register,
  login
}
