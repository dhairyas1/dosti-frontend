import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../../../constant/backend-domain';
import { RootState } from '../../../../store/store';
import { ICourse, ICourseEnrolledByUser } from '../../../../types/course.type';
import { openAuthModal } from '../../site.slice';
import { notification } from '../../../../components/antd';
import './CourseItem.scss';
import { Button, Col, Progress } from '../../../../components/antd';

interface CourseItemProps {
  course: ICourse | ICourseEnrolledByUser;
  onEnroll?: (courseId: string) => void;
  onBuy?: (courseId: string) => void;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, onEnroll, onBuy }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  let thumbnailUrl = '';
  if (course.thumbnail.startsWith('https')) {
    thumbnailUrl = course.thumbnail;
  } else {
    thumbnailUrl = `${BACKEND_URL}/${course.thumbnail}`;
  }

  const handleEnroll = () => {
    if (!isAuth) {
      dispatch(openAuthModal());
      return;
    }

    if (onEnroll) {
      onEnroll(course._id);
    } else {
      navigate(`/courses/${course._id}`);
    }
  };

  const handleBuy = () => {
    if (!isAuth) {
      dispatch(openAuthModal());
      return;
    }

    if (onBuy) {
      onBuy(course._id);
    } else {
      navigate(`/courses/${course._id}`);
    }
  };

  const isEnrolled = 'progress' in course;

  return (
    <Col xs={24} md={12} lg={8} className='course-item'>
      <div className='course-item__wrapper'>
        <div className='course-item__thumbnail'>
          <img src={thumbnailUrl} alt={course.name} />
          {isEnrolled && (
            <div className='course-item__progress'>
              <Progress
                type='circle'
                percent={Math.round((course as ICourseEnrolledByUser).progress * 100)}
                width={50}
              />
            </div>
          )}
        </div>
        <div className='course-item__content'>
          <h3 className='course-item__title'>{course.name}</h3>
          <p className='course-item__description'>{course.description}</p>
          <div className='course-item__meta'>
            <div className='course-item__author'>
              <img src={course.userId.avatar} alt={course.userId.name} />
              <span>{course.userId.name}</span>
            </div>
            <div className='course-item__price'>
              {course.finalPrice > 0 ? (
                <>
                  <span className='course-item__price--original'>${course.price}</span>
                  <span className='course-item__price--final'>${course.finalPrice}</span>
                </>
              ) : (
                <span className='course-item__price--free'>Free</span>
              )}
            </div>
          </div>
          <div className='course-item__actions'>
            {isEnrolled ? (
              <Button type='primary' onClick={handleEnroll}>
                Continue Learning
              </Button>
            ) : course.finalPrice > 0 ? (
              <Button type='primary' onClick={handleBuy}>
                Buy Now
              </Button>
            ) : (
              <Button type='primary' onClick={handleEnroll}>
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CourseItem;
