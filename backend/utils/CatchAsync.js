const catchAsync = f => {
    return(req, res, next) =>{
        Promise.resolve(f(req, res, next)).catch(next)
    }
}

module.exports = catchAsync