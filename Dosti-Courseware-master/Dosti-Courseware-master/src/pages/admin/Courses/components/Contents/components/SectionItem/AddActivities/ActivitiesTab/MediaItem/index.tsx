import React from 'react';
import AddLesson from '../../../../AddLesson';

export type ActivityType = 'media' | 'quiz' | 'assignment' | 'text' | 'survey' | 'scorm';

export interface MediaItemProps {
  courseId: string;
  type: ActivityType;
  sectionId?: string;
  onAddSuccess?: () => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ courseId, type, sectionId, onAddSuccess }) => {
  if (!courseId) return null;

  return (
    <div className="media-item">
      <AddLesson 
        courseId={courseId} 
        activityType={type} 
        sectionId={sectionId}
        onSuccess={onAddSuccess}
      />
    </div>
  );
};

export default MediaItem;
