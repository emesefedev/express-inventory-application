class CustomNotValidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 406;
    
    this.name = "NotValidError";
  }
}

module.exports = CustomNotValidError;