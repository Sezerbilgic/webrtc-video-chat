'use client'
import React, { useRef } from 'react'

type VideoPlayerProps = {
  stream: MediaStream
}

const VideoPlayer = ({stream}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
      if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className='video-player'>
      <video
        style={{ width: "100%" }}
        ref={videoRef}
        autoPlay
        playsInline
      />
    </div>
  )
}

export default VideoPlayer