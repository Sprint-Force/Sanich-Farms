export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "failed",
      message: "Forbidden: Admins only"
    });
  }
  next();
};
