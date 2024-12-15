import React from 'react';
import { Button, notification } from '../../../../../components/antd';

interface PathSection {
  id: string;
  title: string;
  completed: boolean;
}

interface PathSectionsProps {
  sections: PathSection[];
  onSectionClick: (sectionId: string) => void;
}

const PathSections: React.FC<PathSectionsProps> = ({ sections, onSectionClick }) => {
  const handleSectionClick = (section: PathSection) => {
    if (!section.completed) {
      notification.warning({
        message: 'Section Locked',
        description: 'Please complete the previous sections first.'
      });
      return;
    }
    onSectionClick(section.id);
  };

  return (
    <div className="path-sections">
      {sections.map((section) => (
        <Button
          key={section.id}
          onClick={() => handleSectionClick(section)}
          type={section.completed ? 'primary' : 'secondary'}
          disabled={!section.completed}
        >
          {section.title}
        </Button>
      ))}
    </div>
  );
};

export default PathSections; 