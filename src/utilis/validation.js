const ValidatData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (firstName.length == 0) {
    throw new Error("Invalid firstName");
  }
  if (lastName.length == 0) {
    throw new Error("Invalid lastName");
  }
  if (emailId.length == 0) {
    throw new Error("Enter a email id");
  }
  if (password.length == 0) {
    throw new Error(" Please enter a password");
  }
};

module.exports = ValidatData;
