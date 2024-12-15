import React from 'react';
import { useDispatch } from 'react-redux';
import { addSection } from '../../../../../course.slice';
import { ISection } from '../../../../../types/section.type';
import { Button } from '../../../../../components/antd';

interface Props {
  courseId: string;
}

const AddActivities: React.FC<Props> = ({ courseId }) => {
  const dispatch = useDispatch();

  const handleAddSection = () => {
    const newSection: ISection = {
      name: 'New Section',
      lessons: [],
      courseId,
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dispatch(addSection(newSection));
  };

  return (
    <div className="add-activities">
      <Button onClick={handleAddSection}>
        Add Section
      </Button>
    </div>
  );
};

export default AddActivities; 