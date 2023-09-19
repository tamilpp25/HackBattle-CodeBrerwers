import { type NextApiRequest, type NextApiResponse } from "next";
import { YoutubeDataAPI } from "youtube-v3-api";
import { env } from "~/env.mjs";
import axios from 'axios';

const api = new YoutubeDataAPI(env.YT_API_KEY);

interface SearchResult {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
  }
}

interface VideoResult {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    tags: string[]
  },
  statistics: {
    viewCount: number,
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  let VIEW_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&part=id&part=snippet&key=${env.YT_API_KEY}`


  try {
    const results = (await api.searchAll(req.query.search as string, Number.parseInt(req.query.limit as string), {
      type: 'video',
    })).items as SearchResult[]

    const query = req.query.search! as string
    const splitQuery = query.split('%20') 

    results.forEach(e => {
      VIEW_URL += `&id=${e.id.videoId}`
    })

    // const output = results.map(e => {
    //   return {
    //     name: e.snippet.channelTitle,
    //     title: e.snippet.title,
    //     url: `https://youtube.com/watch?v=${e.id.videoId}`,
    //     id: e.id.videoId
    //   }
    // }).filter(e => {
    //   return e.name.includes(req.query.filter as string)
    // }).forEach(e => {
    //   VIEW_URL += `&id=${e.id}`
    // })

    console.log(VIEW_URL)

    await axios.get(VIEW_URL).then(e => {
      let data = e.data.items as VideoResult[]
      data = data.filter(e => {
        return e.snippet.channelTitle.includes(req.query.filter as string)
      }).sort((a, b) => {
        return a.statistics.viewCount - b.statistics.viewCount
      }).reverse().map(e => {
        return {
          views: e.statistics.viewCount,
          name: e.snippet.channelTitle,
          title: e.snippet.title,
          url: `https://youtube.com/watch?v=${e.id}`,
          tags: e.snippet.tags
        }
      })
      
      res.status(200).json(data)
    })

    // res.status(200).json({ output });
  } catch (err) {
    res.status(500).json({
      code: -1,
      msg: 'Internal Server Error'
    })
  }

}