import { type NextApiRequest, type NextApiResponse } from "next";
import { YoutubeDataAPI } from "youtube-v3-api";
import { env } from "~/env.mjs";

const api = new YoutubeDataAPI(env.YT_API_KEY);

interface Result {
  id: {
    kind: string;
    videoId?: string;
    playlistId?: string;
  };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  try {
    const results = (await api.searchAll(req.query.search as string, Number.parseInt(req.query.limit as string), {
      type: 'playlist',
    })).items as Result[]

    const output = results.map(e => {
      return {
        name: e.snippet.channelTitle,
        title: e.snippet.title,
        url: `https://youtube.com/playlist?list=${e.id.playlistId}`
      }
    }).filter(e => {
      return e.name.includes(req.query.filter as string)
    })

    res.status(200).json({ output });
  } catch (err) {
    res.status(500).json({
      code: -1,
      msg: 'Internal Server Error'
    })
  }

}