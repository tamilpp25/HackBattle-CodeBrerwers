import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "../../../server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {

    if (req.method !== 'GET') {
      res.status(405).json({
        msg: 'Invalid method'
      })
      return;
    }

    if (!req.query.id) {
      res.status(400).json({ msg: "missing required param: id" })
      return;
    }

    const user = await db.user.findUnique({
      where: {
        id: req.query.id as string
      }
    })

    if (!user) {
      res.status(404).json({ msg: "User not found!" })
      return;
    }

    res.status(200).json({ msg: "Success", user: user });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" })
  }
}