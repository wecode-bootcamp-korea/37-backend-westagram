function asyncWrap (asyncController) {
    return (req, res, next) => {
        asyncController(req, res, next).catch(next)
    }
}

module.exports = {
    asyncWrap
}