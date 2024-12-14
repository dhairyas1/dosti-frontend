import React from 'react';
import { Tabs } from '../../../../../../../../../components/antd';
import { useAppSelector } from '../../../../../../../../../hooks/useRedux';
import MediaItem from './MediaItem';

const ActivitiesTab: React.FC = () => {
  const { course } = useAppSelector((state) => state.course);
  const courseId = course?._id;
  const sectionId = course?.sections?.[0]?._id;

  if (!courseId || !sectionId) {
    return null;
  }

  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Media" key="1">
        <MediaItem courseId={courseId} sectionId={sectionId} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default ActivitiesTab; 