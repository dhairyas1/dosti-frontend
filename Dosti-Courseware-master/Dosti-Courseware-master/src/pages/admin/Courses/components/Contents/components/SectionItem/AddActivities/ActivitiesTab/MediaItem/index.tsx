import AddLesson from '../../../../AddLesson';
import YoutubeMedia from './Youtube';

interface MediaItemProps {
  courseId: string;
}

const MediaItem: React.FC<MediaItemProps> = ({ courseId }) => {
  return (
    <div className="media-item">
      <AddLesson courseId={courseId} />
    </div>
  );
};

export default MediaItem;
