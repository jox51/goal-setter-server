require("dotenv").config()
//async errors
require("express-async-errors")
const express = require("express")
const cors = require("cors")
const app = express()

const connectDB = require("./db/connect")
const goalsRouter = require("./routes/goals")
const authRouter = require("./routes/auth")
const notFound = require("./middleware/notFound")
const errorHandler = require("./middleware/errorHandlerMiddleware")

//authentication middleware
const authenticateUser = require("./middleware/authentication")

app.use(cors())
// parse json
app.use(express.json())
//routes. First arg is path. Below route where we will perform our API ops
app.get("/", (req, res) => {
  res.send("<h1>Your goals</h1>")
})
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/goals", authenticateUser, goalsRouter)
app.use(notFound)
// app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
