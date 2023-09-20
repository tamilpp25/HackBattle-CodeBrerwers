import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "../../../server/db";

interface CreateReplyBody {
  questionId: string;
  reply: string;
  userId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {

    const body = req.body as CreateReplyBody

    if (req.method !== 'POST') {
      res.status(405).json({
        msg: 'Invalid method'
      })
      return;
    }

    if (!db.user.findFirst({
      where: {
        id: body.userId
      }
    })) {
      res.status(404).json({ msg: 'This user does not exist!' })
      return;
    }

    const question = await db.question.findFirst({
      where: {
        id: body.questionId
      }
    })

    if (!question) {
      res.status(404).json({ msg: "The questionId does not exist!" })
      return;
    }

    const reply = await db.reply.create({
      data: {
        content: body.reply,
        userId: body.userId,
        questionId: question.id
      }
    })

    res.status(200).json({ msg: "Successfully created reply", reply: reply });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" })
  }
}