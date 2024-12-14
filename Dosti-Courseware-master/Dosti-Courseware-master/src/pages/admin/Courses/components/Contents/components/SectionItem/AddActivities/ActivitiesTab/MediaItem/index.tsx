import React from 'react';
import AddLesson from '../../../../AddLesson';

interface MediaItemProps {
  courseId: string;
  type: 'media' | 'quiz' | 'assignment' | 'text' | 'survey' | 'scorm';
}

const MediaItem: React.FC<MediaItemProps> = ({ courseId, type }) => {
  return (
    <div className="media-item">
      <AddLesson courseId={courseId} activityType={type} />
    </div>
  );
};

export default MediaItem;
