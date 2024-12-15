import React from 'react';
import './PathSections.scss';

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
      alert('Please complete the previous sections first.');
      return;
    }
    onSectionClick(section.id);
  };

  return (
    <div className="path-sections">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleSectionClick(section)}
          className={`btn ${section.completed ? 'btn-primary' : 'btn-secondary'}`}
          disabled={!section.completed}
        >
          {section.title}
        </button>
      ))}
    </div>
  );
};

export default PathSections; 