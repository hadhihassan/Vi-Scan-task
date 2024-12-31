export const asyncErrorHandler = (func) =>
    (req, res, next) => {
        func(req, res, next)
            .catch((err) => {
                next(err)
                console.log("Error from async handler: ", err);
            });
    };