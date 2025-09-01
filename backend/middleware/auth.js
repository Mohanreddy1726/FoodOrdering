import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false,message: "Unauthorized access. No token provided."});
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false,message: "Invalid token. Please login again."});
    }
}

export default authMiddleware;