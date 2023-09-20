import React from 'react';

export interface IVideoData {
  url: string;
  thumbnail: string;
  views: number;
  channel: string;
  title: string;
  id: string;
}

interface VideoDataProps {
  info: IVideoData;
}

export default function VideoData({ info }: VideoDataProps) {

    console.log(`https://www.youtube.com/embed/${info.id}`)

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="relative">
        <iframe
          className="h-64 w-full"
          src={`https://www.youtube.com/embed/${info.id}`}
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{info.title}</h2>
        <p className="text-gray-600">{info.channel}</p>
        <a href={info.url} className='text-blue-500' target='_blank'>Click to view on Youtube!</a>
      </div>
    </div>
  );
}
