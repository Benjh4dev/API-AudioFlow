import bcrypt from "bcrypt";
const hashPassword = async (password) => {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
};

const comparePassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword)
  return match
}

export {hashPassword, comparePassword}