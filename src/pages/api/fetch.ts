import { type NextApiRequest, type NextApiResponse } from "next";
import { YoutubeDataAPI } from "youtube-v3-api";
import { env } from "~/env.mjs";
import axios from 'axios';

const api = new YoutubeDataAPI(env.YT_API_KEY);

const connecting_words = ['and', 'or', 'in', 'of', 'at']

const recommends = ['Neso Academy', 'Dr.Gajendra Purohit', 'Gate Smashers', 'Abdul Bari', 'Jenny\'s Lectures CS IT']

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
    // const results = (await api.searchAll(req.query.search as string, Number.parseInt(req.query.limit as string), {
    //   type: 'video',
    // })).items as SearchResult[]

    const results = (await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&q=${req.query.search as string}&key=${env.YT_API_KEY}`)).data.items as SearchResult[]
    const query = req.query.search! as string
    let splitQuery = query.split(' ')

    splitQuery = splitQuery.filter(e => {
      return !connecting_words.includes(e)
    })

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
          channel: e.snippet.channelTitle,
          title: e.snippet.title,
          desc: e.snippet.description,
          url: `https://youtube.com/watch?v=${e.id}`,
          tags: e.snippet.tags
        }
      })
        .filter(e => {
          let exists = false;
          if (!e.tags) {
            return true;
          }
          for (const tag of e.tags) {
            for (const i of splitQuery) {
              if (tag.includes(i)) {
                exists = true;
                console.log(`tag: ${tag} query: ${i}`)
              }
              // console.log(`tag: ${tag} query: ${i} exist: ${exists}`)
            }
          }
          return exists;
        })
        .slice(0, 5)

      const recommendedMatches = data.filter((result) =>
        recommends.includes(result.channel)
      );

      // If there are recommended matches, return the top 3 of them
      if (recommendedMatches.length > 0) {
        res.status(200).json(recommendedMatches.slice(0, 3))
      }

      res.status(200).json(data.slice(0, 1))
    })

    // res.status(200).json({ output });
  } catch (err) {
    res.status(500).json({
      code: -1,
      msg: 'Internal Server Error'
    })
    console.error(err)
  }

}