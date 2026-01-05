import bcrypt from "bcrypt";
import { signJwt } from "../utils/auth.js";

export const signin = async (req, res) => {
  /**
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
    // Step 1: Extract user data from request body
    const { firstName, lastName, address, email, password } = req.body;

    // Step 2: Get MongoDB connection and users collection
    const mongoConn = req.mongoConn;
    const usersCollection = mongoConn.collection("users");

    console.log(req.body);

    // Step 3: Validate password
    if (!password || password.length < 4) {
      return res.status(400).json({
        success: false,
        message: "password is too short or doesn't exist",
      });
    }

    // Step 4: Hash the password using bcrypt
    const hashedPass = await bcrypt.hash(password, 10);

    // Step 5: Create newUser object with hashed password
    const newUser = { firstName, lastName, address, email, password: hashedPass };

    // Step 6: Insert user into MongoDB users collection
    const resUser = await usersCollection.insertOne(newUser);
    console.log(resUser);

    // Step 7: Return success response
    res.status(201).json({
      success: true,
      message: `User ${resUser.insertedId} created successfully`,
    });
  } catch (error) {
    console.error(error);
    // Handle duplicate key error (unique index violation)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        data: {},
        message: "A user with this email already exists",
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      data: {},
      message: error.message,
    });
  }
};


export const login = async (req, res) => {
  /**
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
    // Step 1: Extract credentials from request body
    const { email, password } = req.body;

    // Step 2: Get MongoDB connection and users collection
    const mongoConn = req.mongoConn;
    const usersCollection = mongoConn.collection("users");

    // Step 3: Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Step 4: Find user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Step 5: Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Step 6: Sign JWT token
    const token = signJwt({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id.toString(),
    },);

    // Step 7: Return success response with token
    res.status(200).json({
      success: true,
      data: { token },
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    // Handle other errors
    res.status(500).json({
      success: false,
      data: {},
      message: error.message,
    });
  }
};