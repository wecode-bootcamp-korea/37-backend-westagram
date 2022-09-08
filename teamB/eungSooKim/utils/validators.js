const validatePassword = (password) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("INVALID PASSWORD");
    err.statusCode = 400;
    throw err;
  }
};

const validateEmail = (email) => {
  const re = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );
  if (!re.test(email)) {
    const err = new Error("invalid email");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  validatePassword,
  validateEmail,
};
