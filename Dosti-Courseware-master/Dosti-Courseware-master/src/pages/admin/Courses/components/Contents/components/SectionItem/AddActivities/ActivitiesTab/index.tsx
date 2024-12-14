import React from 'react';
import { Tabs } from '../../../../../../../../../components/antd';
import MediaItem, { ActivityType } from './MediaItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../../store/store';

const ActivitiesTab: React.FC = () => {
  const courseId = useSelector((state: RootState) => state.course.courseId);
  const sectionId = useSelector((state: RootState) => state.course.sectionId);
  
  if (!courseId || !sectionId) {
    return null;
  }

  const handleAddSuccess = () => {
    // Optionally refresh section data or trigger any updates
  };

  const activities: { key: ActivityType; label: string }[] = [
    { key: 'media', label: 'Media' },
    { key: 'quiz', label: 'Quiz' },
    { key: 'assignment', label: 'Assignment' },
    { key: 'text', label: 'Text' },
    { key: 'survey', label: 'Survey' },
    { key: 'scorm', label: 'Scorm' }
  ];

  const items = activities.map(activity => ({
    key: activity.key,
    label: activity.label,
    children: (
      <MediaItem 
        courseId={courseId}
        type={activity.key}
        sectionId={sectionId}
        onAddSuccess={handleAddSuccess}
      />
    )
  }));

  return (
    <Tabs
      items={items}
      defaultActiveKey="media"
      destroyInactiveTabPane
    />
  );
};

export default ActivitiesTab;
