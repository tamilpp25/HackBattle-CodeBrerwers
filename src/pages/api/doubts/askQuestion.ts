import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "../../../server/db";

interface AskQuestionBody {
  title: string;
  question: string;
  userId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {

    const body = req.body as AskQuestionBody

    if (req.method !== 'POST') {
      res.status(405).json({
        msg: 'Invalid method'
      })
      return;
    }

    if (!db.user.findUnique({
      where: {
        id: body.userId
      }
    })) {
      res.status(404).json({ msg: 'This user does not exist!' })
      return;
    }

    const question = await db.question.create({
      data: {
        title: body.title,
        userId: body.userId,
        content: body.question,
      }
    })

    res.status(200).json({ msg: "Successfully created", question: question });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" })
  }
}