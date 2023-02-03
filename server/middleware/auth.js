import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    console.log(" hello auth ");

    const token = req.cookies["social-app-mern"];

    const decrypted = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decrypted.id;

    next();
  } catch (error) {
    console.log("auth ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
}
