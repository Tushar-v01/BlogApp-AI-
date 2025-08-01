// JWT (JSON Web Token) module import kar rahe hain
import jwt from 'jsonwebtoken';

// Auth middleware define kar rahe hain jo token ko verify karega
const auth = (req, res, next) => {
    // Client se aane wale token ko headers se nikaal rahe hain
    const token = req.headers.authorization;

     if (!token) {
        return res.json({ success: false, message: "Token missing in headers" });
    }


    try {
        // Token ko verify kar rahe hain using secret key (env file se)
        jwt.verify(token, process.env.JWT_SECRET);

        // Agar token valid hai to next middleware/function ko call karo
        next();

    } catch (error) {
        // Agar token invalid hai to error response bhejo
        res.json({ success: false, message: "Invalid token" });
    }
}

// Is middleware ko export kar rahe hain taaki routes me use kar sake
export default auth;
