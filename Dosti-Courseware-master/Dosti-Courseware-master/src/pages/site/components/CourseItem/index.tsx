import { Badge, Col, Progress, Row, notification } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button';
import { BACKEND_URL } from '../../../../constant/backend-domain';
import { RootState } from '../../../../store/store';
import { ICourse } from '../../../../types/course.type';
import { IOrderItem } from '../../../../types/order.type';
import { openAuthModal } from '../../../auth.slice';
import { ICourseEnrolledByUser, useGetUserDetailQuery } from '../../client.service';
import { addToCart } from '../../client.slice';
import './CourseItem.scss';
import { ButtonCmp } from '../../../../components/antd';

interface CourseItemProps {
  course: ICourse | ICourseEnrolledByUser;
  onEnroll?: (courseId: string) => void;
  onBuy?: (courseId: string) => void;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, onEnroll, onBuy }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentPath = location.pathname;

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const { data, isFetching } = useGetUserDetailQuery(
    { _userId: userId },
    {
      skip: !userId
    }
  );

  let hasBought = false;

  if ((course as ICourseEnrolledByUser).isBought) {
    hasBought = true;
  }

  const btnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnEl = e.target as HTMLButtonElement;
    const dataAction = btnEl.dataset.action;

    console.log('btn click handler!!!');

    // If already logined

    if (isAuth) {
      if (dataAction === 'buynow') {
        dispatch(addToCart(course._id));

        navigate('/checkout');
      } else if (dataAction === 'enroll') {
        console.log('go to enroll page');

        const newOrderItem: IOrderItem = {
          courseId: course._id,
          name: course.name,
          thumbnail: course.thumbnail,
          finalPrice: course.finalPrice
        };

        if (newOrderItem) {
          onEnroll && onEnroll(course._id);
        }
      }
    } else {
      // If not logined

      notification.warning({ message: 'You need to login to enroll/buy this course' });

      dispatch(openAuthModal());
    }

    // console.log('enrolled or buy now!');
  };

  if (!course) return null;

  let progressPercent: string | number;
  if (course.courseState === 'ordered') {
    progressPercent = ((course as ICourseEnrolledByUser).progress * 100).toFixed(2);
  } else {
    progressPercent = 0;
  }

  // Go to course handler
  const gotoCourseHandler = () => {
    navigate(`/path-player?courseId=${course._id}`);
  };

  const viewCourseDetail = () => {
    onBuy && onBuy(course._id);
  };

  let backgroundImageUrl = '';

  if (course.thumbnail.startsWith('http')) {
    backgroundImageUrl = encodeURI(course.thumbnail);
  } else {
    backgroundImageUrl = encodeURI(`${BACKEND_URL}/${course.thumbnail}`);
  }

  let badgeCourse = 'new';

  if (course.finalPrice < course.price) {
    badgeCourse = 'Special Offer';
  }

  return (
    <Col
      lg={currentPath === '/start' || currentPath === '/' ? 6 : 8}
      md={currentPath === '/start' || currentPath === '/' ? 8 : 12}
      sm={12}
      xs={24}
    >
      <Badge.Ribbon text={badgeCourse}>
        <div className='course-item'>
          <div
            className='course-item__img'
            onClick={viewCourseDetail}
            style={{
              backgroundImage: `url(${backgroundImageUrl || ''})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          ></div>
          <div className='course-item__content'>
            <h3 onClick={viewCourseDetail} className='course-item__title course-item__title--courses-page'>
              {course.name}
            </h3>
            {course.courseState === 'ordered' && (
              <Progress className='course-item__process' percent={progressPercent as number} />
            )}
            <div className='course-item__desc'>{course.description}</div>
            <div className='course-item__author'>
              <img
                src={course.userId.avatar || 'https://via.placeholder.com/150'}
                alt=''
                className='course-item__author-img'
              />
              <div className='course-item__author-name'>{course.userId.name}</div>
            </div>
            <div className='course-item__enrolls'>
              <Row className='course-item__enrolls-row' justify='space-around' align='middle'>
                <Col md={12}>
                  {!hasBought && course.courseState !== 'ordered' && (
                    <ButtonCmp
                      type="primary"
                      onClick={() => course.finalPrice === 0 ? onEnroll?.(course._id) : onBuy?.(course._id)}
                      className="course-item__button"
                    >
                      {course.finalPrice === 0 ? 'Enroll Now' : 'Buy Now'}
                    </ButtonCmp>
                  )}
                  {hasBought && (
                    <ButtonCmp
                      onClick={() => navigate(`/path-player?courseId=${course._id}`)}
                      className="course-item__button"
                    >
                      Go to Course
                    </ButtonCmp>
                  )}
                </Col>
                <Col md={12}>
                  {course.courseState !== 'ordered' && (
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
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Badge.Ribbon>
    </Col>
  );
};

// generate default props for this component

CourseItem.defaultProps = {
  course: {
    _id: '',
    name: '',
    thumbnail: '',
    description: '',
    price: 0,
    finalPrice: 0,
    userId: {
      _id: '',
      name: '',
      avatar: ''
    },
    createdAt: '',
    updatedAt: '',
    categoryId: {
      _id: '',
      name: ''
    }
  }
};
export default CourseItem;
