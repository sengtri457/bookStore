const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    jwt.verify(token, "bookStore123", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Token is invalid" });
        }

        req.user = decoded; // decoded will contain { id, email, role, ... }
        next();
    });
};

module.exports = { authenticateToken };
