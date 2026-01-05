import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || "change-this-secret";
const jwtExpire = process.env.JWT_EXPIRE || "1h";

export function signJwt(payload) {
  return jwt.sign(
    {
      ...payload
    },
    jwtSecret,
    { expiresIn: jwtExpire }
  );
}

export function verifyJwt(token) {
  return jwt.verify(token, jwtSecret);
}