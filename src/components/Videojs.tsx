import React from 'react';
import ReactPlayer from 'react-player';

interface VideojsProps {
  url: string;
  onProgress?: (state: { played: number; playedSeconds: number }) => void;
}

const Videojs: React.FC<VideojsProps> = ({ url, onProgress }) => {
  return (
    <ReactPlayer
      url={url}
      controls
      width="100%"
      height="100%"
      onProgress={onProgress}
    />
  );
};

export default Videojs; 