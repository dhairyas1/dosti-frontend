import React from 'react';
import { Link } from 'react-router-dom';
import { ICourse } from '../../../../../types/course.type';
import './CourseItem.scss';

interface CourseItemProps {
  course: ICourse;
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const { id, name, thumbnail, price, access } = course;

  return (
    <div className='course-item'>
      <div className='course-item__thumbnail'>
        <img src={thumbnail} alt={name} />
      </div>
      <div className='course-item__content'>
        <h3 className='course-item__title'>
          <Link to={`/admin/courses/${id}`}>{name}</Link>
        </h3>
        <hr className='course-item__divider' />
        <div className='course-item__meta'>
          <span className='course-item__price'>${price}</span>
          <span className={`course-item__access course-item__access--${access.toLowerCase()}`}>
            {access}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseItem; 