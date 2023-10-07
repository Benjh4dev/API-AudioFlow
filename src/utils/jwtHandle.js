import jwtCommonJS from 'jsonwebtoken';

const { sign, verify } = jwtCommonJS;
import "dotenv/config"
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret_key_1234554321"

const generateToken = (id) => {
    const token = sign({ id }, JWT_SECRET_KEY, { 
      expiresIn: "2h" 
    });
    return token;
};

export { generateToken }