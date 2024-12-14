import React from 'react';
import Videojs from '../../../../../components/Videojs';

interface PlayerScreenProps {
  videoUrl: string;
  onComplete: () => Promise<void>;
}

const PlayerScreen: React.FC<PlayerScreenProps> = ({ videoUrl, onComplete }) => {
  return (
    <div className="player-screen">
      <Videojs url={videoUrl} onProgress={onComplete} />
    </div>
  );
};

export default PlayerScreen;
