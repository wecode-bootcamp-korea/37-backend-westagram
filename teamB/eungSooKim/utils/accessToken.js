const accessToken = async (req, res, next) => {
  try {
    const token = req.headers.Authorization;
    if (!token){
    next();}
  } catch (err) {
    next(err);
  }
};


module.exports = { accessToken }