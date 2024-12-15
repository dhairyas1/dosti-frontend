import React from 'react';
import { ISection } from '../../../../../../../../components/antd';

interface Props {
  section: ISection;
}

const AddActivities: React.FC<Props> = ({ section }) => {
  return (
    <div className="add-activities">
      <h3>{section.name}</h3>
      {/* Add activities content */}
    </div>
  );
};

export default AddActivities; 