import jwt from "jsonwebtoken";

const secret = "jwt-secret-123"

const data = {
  id: 1,
  name: "Yossi",
  age: 30
}

const token = jwt.sign(data,  secret, {expiresIn: "1h"})
console.log(token)

const verified = jwt.verify(token, secret)
console.log(verified)