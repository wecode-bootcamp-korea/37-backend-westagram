const userDao = require("../models/userDao");

const signUp = async (name, email, password, profileImage) => {
  // password validation using REGEX
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("비밀번호는 영어,숫자,특수문자를 포함해 8-20자로 만들어주세요");
    err.statusCode = 409;
    throw err;
  }
  const createUser = await userDao.createUser(
    name,
    email,
    password,
    profileImage
  );

  return createUser;
};

module.exports = {
  signUp
};
