import { NextApiRequest, NextApiResponse } from "next"
import { genSalt, hash } from "bcrypt"

export default async function hashPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.password) {
    res.status(400).json({ message: "Missing argument: password." })
  } else {
    const salt = await genSalt(10)
    const hashedPassword = await hash(req.body.password, salt)
    res.status(200).json({ password: hashedPassword })
  }
}
