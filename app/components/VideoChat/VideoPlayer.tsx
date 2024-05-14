'use client'
import React, { useRef } from 'react'

type VideoPlayerProps = {
  stream: MediaStream
  muted?: boolean
}

const VideoPlayer = ({stream, muted = false}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
      if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className='video-player'>
      <video
        style={{ width: "100%", pointerEvents: "none" }}
        ref={videoRef}
        autoPlay
        playsInline
        controls={false}
        muted={muted}
      />
    </div>
  )
}

export default VideoPlayer