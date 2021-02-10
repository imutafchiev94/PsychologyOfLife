const jwt = require('jsonwebtoken');

module.exports = function () {
    return (req, res, next) => {
        let token = req.cookies[process.env.COOKIE_SESSION_NAME];

        if(token) {
            jwt.verify(token, process.env.USER_SESION_SECRET, function(err, decoded) {
                if(err) {
                    res.clearCookie(process.env.COOKIE_SESSION_NAME);
                } else {
                    req.user = decoded;
                    res.locals.user = decoded;
                    res.locals.isAuthenticated = true;

                    if(decoded.role != 'admin') {
                        res.locals.isAdmin = false;
                    } else {
                        res.locals.isAdmin = true;
                    }
                }
            })
        }

        next();
    }
}