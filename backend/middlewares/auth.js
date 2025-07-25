import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const accessToken = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = decoded; 
      next();
    } catch (err) {
      return res.status(401).json({ 
        status: "failed",
        message: 'Invalid or expired token' });
    }
  } else {
    return res.status(401).json({
        status: "failed",
        message: "Unauthorized!" });
  }
};
