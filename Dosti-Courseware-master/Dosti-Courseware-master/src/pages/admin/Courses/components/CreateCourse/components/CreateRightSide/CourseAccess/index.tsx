import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/store';
import { AccessStatus } from '../../../../../../../../types/course.type';
import { handleFormData } from '../../../../../course.slice';
import './CourseAccess.scss';

const CourseAccess = () => {
  const formData = useSelector((state: RootState) => state.course.formData);
  const dispatch = useDispatch();

  const handleAccessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(handleFormData({
      field: 'access',
      value: e.target.value as AccessStatus
    }));
  };

  return (
    <div className='course-access'>
      <div className='course-access__wrap px-8'>
        <h3 className='course-access__title'>Write a Access for your course</h3>

        <p className='course-access__desc font-normal'>
          Craft a catchy title and capture your students' imagination. Make it short, precise, memorable and SEO
          friendly by including strong keywords in it.
        </p>
        <div className='course-access__input-group mt-4'>
          <label htmlFor='access' className='course-access__input-label'>
            Your access
          </label>
          <select
            id="access"
            value={formData.access}
            onChange={handleAccessChange}
            className='course-access__input-input'
          >
            <option value="">Select access type</option>
            <option value={AccessStatus.FREE}>Free</option>
            <option value={AccessStatus.PAID}>Paid</option>
            <option value={AccessStatus.DRAFT}>Draft</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourseAccess;
