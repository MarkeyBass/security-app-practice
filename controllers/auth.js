import bcrypt from "bcrypt";

export const signin = async (req, res) => {
  try {
    const { firstName, lastName, address, email, password } = req.body;

    const mongoConn = req.mongoConn;
    const usersCollection = mongoConn.collection("users");

    console.log(req.body);

    if (!password || password.length < 4) {
      res.status(400).json({
        message: "password is too short or doesn't exist",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = { firstName, lastName, address, email, password: hashedPass };

    const resUser = await usersCollection.insertOne(newUser);
    console.log(resUser);

    /**
     * store the data inside users collection
     */

    // Validate password
    res.status(201).json({ message: `User ${resUser.insertedId } created successfully` });
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

    res.status(500).json({ success: false, data: error.message });
  }
};
