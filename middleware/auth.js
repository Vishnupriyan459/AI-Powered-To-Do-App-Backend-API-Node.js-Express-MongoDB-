import jwt from "jsonwebtoken";  
const { verify } = jwt; 
export default function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
