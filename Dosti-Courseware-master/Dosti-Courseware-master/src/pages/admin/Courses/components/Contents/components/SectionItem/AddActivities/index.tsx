import { Button, Modal } from '../../../../../components/antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ISection } from '../../../../../../../../types/course.type';
import { startAddSection } from '../../../../../course.slice';
import ActivitiesTab from './ActivitiesTab';

type Props = {
  sectionId: string;
  courseId: string;
};

const AddActivities: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const addActivitiesHandler = () => {
    const section: ISection = {
      _id: props.sectionId,
      name: '',
      lessons: [],
      courseId: props.courseId,
      order: 0
    };
    dispatch(startAddSection(section));
    setOpen(true);
  };

  return (
    <>
      <Button type='primary' onClick={addActivitiesHandler}>
        Add activities
      </Button>
      <Modal
        title='Add Learning Activities'
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <ActivitiesTab />
      </Modal>
    </>
  );
};

export default AddActivities;
