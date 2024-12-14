import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../../../constant/backend-domain';
import { RootState } from '../../../../store/store';
import { ICourse } from '../../../../types/course.type';
import { ICourseEnrolledByUser } from '../../../../types/user.type';
import { addToCart } from '../../client.slice';
import { openAuthModal } from '../../site.slice';
import { notification } from 'antd';
import './CourseItem.scss';
import { Button, Col, Progress } from 'antd';

interface CourseItemProps {
  course: ICourse | ICourseEnrolledByUser;
  onEnroll?: (courseId: string) => void;
  onBuy?: (courseId: string) => void;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, onEnroll, onBuy }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const isEnrolled = 'isBought' in course && course.isBought;
  const progress = isEnrolled && 'progress' in course ? course.progress : 0;
  const status = course.courseState || course.access || 'DRAFT';

  if (!course) return null;

  const viewCourseDetail = () => {
    onBuy && onBuy(course._id);
  };

  const handleEnrollOrBuy = () => {
    if (!isAuth) {
      notification.warning({ 
        message: 'You need to login to enroll/buy this course',
        description: 'Please login or register to continue'
      });
      dispatch(openAuthModal());
      return;
    }

    if (course.finalPrice === 0) {
      onEnroll?.(course._id);
    } else {
      dispatch(addToCart(course._id));
      navigate('/checkout');
    }
  };

  let thumbnailUrl = '';
  if (course.thumbnail.startsWith('http')) {
    thumbnailUrl = encodeURI(course.thumbnail);
  } else {
    thumbnailUrl = encodeURI(`${BACKEND_URL}/${course.thumbnail}`);
  }

  return (
    <Col
      lg={location.pathname === '/start' || location.pathname === '/' ? 6 : 8}
      md={location.pathname === '/start' || location.pathname === '/' ? 8 : 12}
      sm={12}
      xs={24}
    >
      <div className='course-item'>
        <div
          className='course-item__img'
          onClick={viewCourseDetail}
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        <div className='course-item__content'>
          <h3 onClick={viewCourseDetail} className='course-item__title'>
            {course.name}
          </h3>
          {isEnrolled && (
            <Progress className='course-item__progress' percent={progress * 100} />
          )}
          <div className='course-item__desc'>{course.description}</div>
          <div className='course-item__author'>
            <img
              src={course.userId.avatar || 'https://joeschmoe.io/api/v1/random'}
              alt=''
              className='course-item__author-img'
            />
            <div className='course-item__author-name'>{course.userId.name}</div>
          </div>
          <div className='course-item__enrolls'>
            <div className='course-item__enrolls-row'>
              <div className='course-item__button-wrapper'>
                {!isEnrolled && (
                  <Button
                    type="primary"
                    onClick={handleEnrollOrBuy}
                    className="course-item__button"
                  >
                    {course.finalPrice === 0 ? 'Enroll Now' : 'Buy Now'}
                  </Button>
                )}
                {isEnrolled && (
                  <Button
                    onClick={() => navigate(`/path-player?courseId=${course._id}`)}
                    className="course-item__button"
                  >
                    Go to Course
                  </Button>
                )}
              </div>
              <div className='course-item__price-wrapper'>
                {!isEnrolled && (
                  <div className='course-item__prices'>
                    {course.finalPrice === 0 ? (
                      <div className='course-item__prices-free'>FREE</div>
                    ) : (
                      <>
                        <span className='course-item__prices-old'>${course.price}</span>
                        <span className='course-item__prices-new'>${course.finalPrice}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='course-item__status'>
            {status}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CourseItem;
