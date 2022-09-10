const checkAffectedRows = (post) => {
  if (post.affectedRows > 1) {
    const err = new Error("Please check the number of your update posts");
    err.statusCode = 409;
    throw err;
  }
};

module.exports = {
  checkAffectedRows,
};
