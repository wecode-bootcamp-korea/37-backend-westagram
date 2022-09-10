const validation = (email, password) => {
  const mailValidation = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );

  const pwValidation = new RegExp(
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/
  );

  if (!pwValidation.test(password)) {
    const err = new Error("INVALID_PASSWORD");
    err.statusCode = 400;
    throw err;
  }

  if (!mailValidation.test(email)) {
    const err = new Error("INVALID_E-MAIL");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = { validation };
