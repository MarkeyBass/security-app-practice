export const signin = async (req, res) => {
  /**
   * TODO:
   * SIGNIN FLOW:
   * 1. Extract user data from request body (firstName, lastName, address, email, password)
   * 2. Get MongoDB connection and users collection
   * 3. Validate password (must exist and be at least 4 characters)
   *    - If invalid: return 400 error
   * 4. Hash the password using bcrypt (salt rounds: 10)
   * 5. Create newUser object with hashed password
   * 6. Insert user into MongoDB users collection
   *    - If duplicate email (error code 11000): return 409 conflict error
   *    - If other error: return 500 server error
   * 7. Return 201 success response with user ID
   */
  try {
  } catch (error) {}
};

export const login = async (req, res) => {
  /**
   * TODO:
   * LOGIN FLOW:
   * 1. Extract credentials from request body (email, password)
   * 2. Get MongoDB connection and users collection
   * 3. Validate input (email and password must be provided)
   *    - If invalid: return 400 error
   * 4. Find user by email in MongoDB users collection
   *    - If user not found: return 401 unauthorized error
   * 5. Compare provided password with stored hashed password using bcrypt
   *    - If password invalid: return 401 unauthorized error
   * 6. Sign JWT token with user data (firstName, lastName, _id)
   *    - Token expires in 1 hour
   * 7. Return 200 success response with token
   *    - If other error: return 500 server error
   */
  try {
  } catch (error) {}
};
