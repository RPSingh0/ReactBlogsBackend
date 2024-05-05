const parseValidationError = err => {
    const errors = Object.values(err.errors).map(element => element.message);

    return `Invalid input data. ${errors.join('. ')}`;
}

module.exports = (err, req, res, next) => {

    let error = err.message;

    if (err.name === 'ValidationError') {
        error = parseValidationError(err)
    }

    res.status(500).json({
        status: 'error',
        message: error
    })
}