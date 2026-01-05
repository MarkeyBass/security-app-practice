import { ObjectId } from "mongodb";
import { verifyJwt } from "../utils/auth.js";


export async function protect(req, res, next) {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } 

    if (!token) {
      console.log("Token was not provided");
      return res.status(401).json({ success: false, message: "Not authorized" });
    }
    
    const decoded = verifyJwt(token);

    if (!decoded || !decoded._id) {
      console.log("Token verification failed or missing _id");
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const userId = decoded._id;

    const user = await req.mongoConn.collection("users").findOne({ _id: new ObjectId(userId) });

    console.log(user)

    if (!user) {
      console.log("No user was found")
      return res.status(401).json({ success: false, message: "Not authorized" });
    }
    req.user = { _id: user._id, firstName: user.firstName, lastName: user.lastName };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: "Not authorized" });
  }
}

// export function authorizeResource(resource) {
//   return (req, res, next) => {
//     if (req.user._id !== resource._id) {
//       return res.status(403).json({ success: false, message: "Forbidden" });
//     }
//     next();
//   };
// }

