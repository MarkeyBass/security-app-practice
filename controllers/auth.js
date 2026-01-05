export const signin = async (req, res) => {
/**
 * BODY {
 *  firstName,
 *  lastName,
 *  address,
 *  email (UNIQUE),
 *  password (At least 4 charachters)
 * }
 * balidate data
 * create hash with bcrypt
 * store the data inside users collection
*/

  // Validate password
  res.status(200).json({message: "Health check - Implement signin controller with bcypt"})
}