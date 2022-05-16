import { NextApiRequest, NextApiResponse } from "next"
import { compare, genSalt, hash } from "bcrypt"

export default async function comparePassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.password && !req.body.confirmPassword) {
    res
      .status(400)
      .json({ message: "Missing argument(s): password or confirmPassword." })
  } else {
    if (await compare(req.body.password, req.body.confirmPassword)) {
      res.status(200).json({ message: "Success." })
    } else {
      res.status(500).json({ message: "Not allowed." })
    }
  }
}
