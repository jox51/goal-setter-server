require("dotenv").config()
//async errors
require("express-async-errors")
const express = require("express")
const app = express()

const connectDB = require("./db/connect")
const goalsRouter = require("./routes/goals")
const authRouter = require("./routes/auth")
const notFound = require("./middleware/notFound")
const errorHandler = require("./middleware/errorHandlerMiddleware")

// extra security packages
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

// Swagger
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocument = YAML.load("./swagger.yaml")

//authentication middleware
const authenticateUser = require("./middleware/authentication")

// parse json
app.use(express.json())

// extra packages
app.set("trust proxy", 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 mins
    max: 100 // limit each IP up to 100 requests per windowMs
  })
)
app.use(helmet())
app.use(cors())
app.use(xss())

//routes. First arg is path. Below route where we will perform our API ops
app.get("/", (req, res) => {
  res.send("<h1>Goal API</h1><a href='/api-docs'>Documentation</a>")
})
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
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
