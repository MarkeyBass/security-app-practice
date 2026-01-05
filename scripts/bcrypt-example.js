import bcrypt from "bcrypt";
const saltRounds = 10;
const myPlaintextPassword = "MyPass123";
const wrontPassword = "wrongPass"
// const someOtherPlaintextPassword = 'not_bacon';

const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

const hash2 = await bcrypt.hash(myPlaintextPassword, saltRounds);

const compare = await bcrypt.compare(myPlaintextPassword, hash)
const compare2 = await bcrypt.compare(myPlaintextPassword, hash2)
const compare3 = await bcrypt.compare(wrontPassword, hash2)
const compare4 = await bcrypt.compare(hash, hash2)
const compare5 = await bcrypt.compare(hash, hash)

console.log({
  myPlaintextPassword,
  hash, // true
  hash2, // true
  "hash === hash2": hash === hash2, // false
  compare,
  compare2,
  compare3,
  compare4,
  compare5,
});
