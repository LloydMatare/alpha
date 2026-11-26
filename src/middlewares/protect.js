import "dotenv/config";
import jwt from "jsonwebtoken";

const readCookie = (req, name) => {
  const header = req.headers.cookie;
  if (!header) return null;

  for (const entry of header.split(";")) {
    const [key, ...parts] = entry.trim().split("=");
    if (key === name) return decodeURIComponent(parts.join("="));
  }

  return null;
};

const protect = (req, res, next) => {
  const token = readCookie(req, "jwt");

  if (!token) {
    return res.status(401).json({ status: "fail", message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    return next();
  } catch {
    return res
      .status(401)
      .json({ status: "fail", message: "Invalid or expired token" });
  }
};

export { protect };
