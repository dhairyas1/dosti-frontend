import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLesson } from '../../../../../course.slice';
import './AddLesson.scss';

interface AddLessonProps {
  sectionId: string;
}

const AddLesson: React.FC<AddLessonProps> = ({ sectionId }) => {
  const dispatch = useDispatch();
  const [lessonType, setLessonType] = useState<'video' | 'text'>('video');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a lesson title');
      return;
    }

    dispatch(addLesson({
      sectionId,
      lesson: {
        title,
        type: lessonType,
        content: '',
        duration: 0,
        isPreview: false
      }
    }));

    setTitle('');
  };

  return (
    <form className='add-lesson' onSubmit={handleSubmit}>
      <div className='add-lesson__type'>
        <label>
          <input
            type="radio"
            name="lessonType"
            value="video"
            checked={lessonType === 'video'}
            onChange={(e) => setLessonType(e.target.value as 'video' | 'text')}
          />
          Video Lesson
        </label>
        <label>
          <input
            type="radio"
            name="lessonType"
            value="text"
            checked={lessonType === 'text'}
            onChange={(e) => setLessonType(e.target.value as 'video' | 'text')}
          />
          Text Lesson
        </label>
      </div>

      <div className='add-lesson__input'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter lesson title"
        />
        <button type="submit">Add Lesson</button>
      </div>
    </form>
  );
};

export default AddLesson; 