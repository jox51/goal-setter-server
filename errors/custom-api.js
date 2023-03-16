class CustomAPIError extends Error {
  constructor(message) {
    //calls constructor of Error
    super(message)
  }
}

module.exports = CustomAPIError
