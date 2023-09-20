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

    const question = await db.question.findFirst({
      where: {
        id: req.query.id as string
      }
    })

    if (!question) {
      res.status(404).json({ msg: "questionId does not exist!" })
      return;
    }

    const replies = await db.reply.findMany({
      where: {
        questionId: question.id
      }
    })

    res.status(200).json({ msg: "Success", question: question, replies: replies });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" })
  }
}