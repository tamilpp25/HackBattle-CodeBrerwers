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


    if (req.query.filter) {
        const questions = await db.question.findMany({
            where: {
                title: {
                    contains: req.query.filter as string
                }
            }
        })
        if (questions) {
            res.status(200).json({ msg: "Success", questions: questions });
            return;
        }
    } 

    const questions = await db.question.findMany()

    res.status(200).json({ msg: "Success", questions: questions });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" })
  }
}