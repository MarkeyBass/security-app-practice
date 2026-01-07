import { ObjectId } from "mongodb";
import { verifyJwt } from "../utils/auth.js";

export async function protect(req, res, next) {
  /**
   * TODO:
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
  } catch (err) {}
}
