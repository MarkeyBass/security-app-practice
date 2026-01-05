import { ObjectId } from "mongodb";
import { verifyJwt } from "../utils/auth.js";


export async function protect(req, res, next) {
  /**
   * PROTECT MIDDLEWARE FLOW:
   * 1. Extract JWT token from Authorization header (format: "Bearer <token>")
   *    - If no Authorization header or doesn't start with "Bearer": return 401 error
   * 2. Verify token exists
   *    - If token is missing: return 401 unauthorized error
   * 3. Verify and decode JWT token using verifyJwt function
   *    - If token is invalid or expired: catch error and return 401 unauthorized error
   * 4. Validate decoded token payload contains _id
   *    - If decoded token is missing or missing _id: return 401 unauthorized error
   * 5. Extract user ID from decoded token
   * 6. Query MongoDB users collection to find user by _id (convert string ID to ObjectId)
   *    - If user not found: return 401 unauthorized error
   * 7. Attach user data to request object (req.user) with _id, firstName, lastName
   * 8. Call next() to proceed to the next middleware/route handler
   *    - If any error occurs during process: catch and return 401 unauthorized error
   */
  try {
    // Step 1: Extract JWT token from Authorization header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Step 2: Verify token exists
    if (!token) {
      console.log("Token was not provided");
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    // Step 3: Verify and decode JWT token
    const decoded = verifyJwt(token);

    // Step 4: Validate decoded token payload contains _id
    if (!decoded || !decoded._id) {
      console.log("Token verification failed or missing _id");
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    // Step 5: Extract user ID from decoded token
    const userId = decoded._id;

    // Step 6: Query MongoDB users collection to find user by _id
    const user = await req.mongoConn.collection("users").findOne({ _id: new ObjectId(userId) });

    console.log(user);

    if (!user) {
      console.log("No user was found");
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    // Step 7: Attach user data to request object
    req.user = { _id: user._id, firstName: user.firstName, lastName: user.lastName };

    // Step 8: Call next() to proceed to the next middleware/route handler
    next();
  } catch (err) {
    // Handle any errors during the authentication process
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

