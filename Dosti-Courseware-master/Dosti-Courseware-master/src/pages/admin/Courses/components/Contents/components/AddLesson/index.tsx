import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/store';
import { ILesson } from '../../../../../../../types/lesson.type';
import { useAddLessonMutation } from '../../../../course.service';
import './AddLesson.scss';

type ActivityType = 'media' | 'quiz' | 'assignment' | 'text' | 'survey' | 'scorm';
type AccessType = 'DRAFT' | 'FREE' | 'PAID';

interface AddLessonProps {
  courseId: string;
  activityType?: ActivityType;
  sectionId?: string;
  onSuccess?: () => void;
}

interface LessonFormData {
  name: string;
  content: string;
  access: AccessType;
  description: string;
}

const AddLesson: React.FC<AddLessonProps> = ({ courseId, activityType = 'media', sectionId, onSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const playerRef = React.useRef<ReactPlayer | null>(null);
  const [formData, setFormData] = useState<LessonFormData>({
    name: '',
    content: '',
    access: 'FREE',
    description: ''
  });
  const [addLesson] = useAddLessonMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sectionId) {
      alert('Please select a section first');
      return;
    }

    try {
      const lessonData: Omit<ILesson, '_id'> = {
        name: formData.name,
        content: formData.content,
        access: formData.access,
        sectionId: sectionId,
        type: activityType,
        description: formData.description,
        videoLength: activityType === 'media' ? playerRef.current?.getDuration() || 0 : undefined,
        courseId: courseId,
        videoUrl: activityType === 'media' ? formData.content : undefined,
        order: 0
      };

      await addLesson(lessonData).unwrap();
      
      alert(`${activityType} lesson added successfully`);
      setShowForm(false);
      setFormData({
        name: '',
        content: '',
        access: 'FREE',
        description: ''
      });
      onSuccess?.();
    } catch (error: any) {
      alert(error.data?.message || 'An error occurred while adding the lesson');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <button 
        className="btn-primary"
        onClick={() => setShowForm(true)}
      >
        Add {activityType.charAt(0).toUpperCase() + activityType.slice(1)}
      </button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add {activityType.charAt(0).toUpperCase() + activityType.slice(1)}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {activityType === 'media' && (
                <div className="form-group">
                  <label>Media URL:</label>
                  <input
                    type="text"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              {activityType === 'text' && (
                <div className="form-group">
                  <label>Content:</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={4}
                  />
                </div>
              )}

              <div className="form-group">
                <label>Access:</label>
                <select 
                  name="access"
                  value={formData.access}
                  onChange={handleInputChange}
                  required
                >
                  <option value="DRAFT">Draft</option>
                  <option value="FREE">Free</option>
                  <option value="PAID">Paid</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                />
              </div>

              {activityType === 'media' && formData.content && (
                <ReactPlayer
                  ref={playerRef}
                  url={formData.content}
                  width={0}
                  height={0}
                  config={{
                    youtube: {
                      playerVars: {
                        controls: 0,
                        modestbranding: 1,
                        showinfo: 0,
                        fs: 0
                      }
                    }
                  }}
                />
              )}

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Add {activityType.charAt(0).toUpperCase() + activityType.slice(1)}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLesson;
