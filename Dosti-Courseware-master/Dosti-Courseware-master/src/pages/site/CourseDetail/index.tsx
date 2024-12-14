import { CheckOutlined, HeartOutlined, RightCircleFilled, StarFilled } from '@ant-design/icons';
import { Breadcrumb, Button, Col, List, Row, Space, Typography, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonCmp from '../../../components/Button';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { RootState } from '../../../store/store';
import { AccessStatus, CourseLevel } from '../../../types/course.type';
import { IOrder } from '../../../types/order.type';
import { formatVideoLengthToHours, transformDate } from '../../../utils/functions';
import { openAuthModal } from '../../auth.slice';
import {
  useCreateOrderMutation,
  useGetCourseDetailQuery,
  useGetSectionsByCourseIdQuery,
  useGetUserQuery
} from '../client.service';
import { addToCart } from '../client.slice';
import './CourseDetail.scss';
import SectionList from './components/SectionList';
// type Props = {}
const CourseDetail: React.FC = () => {
  // HOOKS HERE
  const params = useParams();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const { data: userData } = useGetUserQuery(userId);

  const { courseId } = params;

  const { data } = useGetCourseDetailQuery({ courseId, userId } as { courseId: string; userId: string });
  const [createOrder, createOrderResult] = useCreateOrderMutation();
  const navigate = useNavigate();

  const courseData = useMemo(() => {
    if (!data?.course) return null;
    const course = data.course;
    return {
      _id: course._id,
      name: course.title || '',
      description: course.description,
      price: course.price,
      finalPrice: course.finalPrice,
      access: course.access,
      level: course.level,
      thumbnail: course.thumbnail,
      courseSlug: course.courseSlug,
      categoryId: course.categoryId,
      userId: course.userId,
      sections: course.sections || [],
      lessons: course.lessons || [],
      createdAt: course.createdAt,
      updatedAt: course.updatedAt
    };
  }, [data?.course]);

  let thumbnailUrl = '';
  if (courseData?.thumbnail.startsWith('https')) {
    thumbnailUrl = courseData.thumbnail;
  } else {
    thumbnailUrl = `${BACKEND_URL}/${courseData?.thumbnail}`;
  }

  const { data: sectionData } = useGetSectionsByCourseIdQuery(courseId || '');

  const numOfSections = sectionData?.sections.length || 0;

  const overviewData = [
    `${formatVideoLengthToHours(courseData?.totalVideosLength || 0)} on-demand video`,
    `${courseData?.sections} articles.`,
    '0 downloadable resources.',
    'Access on mobile and TV.',
    'Full lifetime access.',
    'Certificate of completion.'
  ];

  const addCartHandler = () => {
    dispatch(addToCart(courseId as string));
  };

  const subscribeCourseHandler = () => {
    if (isAuth) {
      const orderItem = {
        courseId: courseId as string,
        name: courseData?.name,
        thumbnail: courseData?.thumbnail,
        finalPrice: courseData?.finalPrice
      };

      const newOrder: Omit<IOrder, '_id'> = {
        items: [orderItem],
        user: {
          _id: userId,
          email: userData?.user.email || '',
          name: userData?.user.name || '',
          phone: userData?.user.phone || '',
          avatar: userData?.user.avatar || ''
        },
        transaction: {
          method: 'VNPAY'
        },
        totalPrice: 0,
        vatFee: 0,
        note: 'ENROLL COURSE FREE'
      };

      createOrder(newOrder)
        .unwrap()
        .then((result) => {
          console.log(result);

          navigate(`/cart/subscribe/course/${orderItem.courseId}`);
          notification.success({
            message: 'Enroll course successfully'
          });
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    } else {
      notification.error({
        message: 'Please login to enroll this course'
      });

      dispatch(openAuthModal());
    }
  };

  const buyNowHandler = () => {
    if (isAuth) {
      dispatch(addToCart(courseId as string));
      navigate(`/checkout`);
    } else {
      notification.error({
        message: 'Please login to buy this course'
      });

      dispatch(openAuthModal());
    }
  };

  const gotoCourseHandler = () => {
    navigate(`/path-player?courseId=${courseId as string}`);
  };

  return (
    <div className='course-detail'>
      <div className='course-detail__wrap spacing-h-sm'>
        <div className='course-detail__intro '>
          <div className='container'>
            <Row gutter={16} className='course-detail__intro-wrap'>
              <Col md={16}>
                <Breadcrumb
                  className='course-detail__breadcrumb'
                  items={[
                    {
                      title: 'Home'
                    },
                    {
                      title: <a href=''>Application Center</a>
                    },
                    {
                      title: <a href=''>Application List</a>
                    },
                    {
                      title: 'An Application'
                    }
                  ]}
                />

                <h2 className='course-detail__title'>{courseData?.name}</h2>
                <p className='course-detail__sub-title'>{courseData?.description}</p>
                <div className='course-detail__info'>
                  <div className='course-detail__info-item course-detail__info-status'>Bestseller</div>
                  <div className='course-detail__info-item course-detail__info-rating'>
                    <Space>
                      <span>{courseData?.avgRatingStars}</span>
                      <span>
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                      </span>
                      <Link to='/'>({courseData?.numOfReviews} ratings)</Link>
                    </Space>
                  </div>
                  <div className='course-detail__info-item course-detail__info-students'>
                    <Space>
                      <span>{courseData?.students}</span>
                      <span>students</span>
                    </Space>
                  </div>
                </div>
                <div className='course-detail__intro-author'>
                  <span className=''>Author</span>
                  <Link to={`/user/${courseData?.userId._id}`} className='course-detail__intro-author-name'>
                    {courseData?.userId.name}
                  </Link>
                </div>
                <div className='course-detail__intro-updated-at'>Last updated {transformDate(courseData?.updatedAt)}</div>
              </Col>
              <Col sm={16} md={8} lg={8}>
                <div className='course-detail__overview'>
                  <div className='course-detail__thumbnail'>
                    <img
                      src={thumbnailUrl || 'https://img-c.udemycdn.com/course/240x135/3510096_5891.jpg'}
                      alt=''
                      className='course-detail__thumbnail-img'
                    />
                    <div className='course-detail__thumbnail-overlay'>
                      <RightCircleFilled className='course-detail__thumbnail-overlay-icon' />
                      <div className='course-detail__thumbnail-overlay-text'>
                        <span>Preview This course</span>
                      </div>
                    </div>
                  </div>
                  <div className='course-detail__overview-content '>
                    <div className='course-detail__overview-price'>{courseData?.finalPrice === 0 && 'FREE'}</div>
                    {courseData?.finalPrice !== 0 && !courseData?.isBought && (
                      <div className='course-detail__overview-price'>
                        <div>
                          <s className='font-light mr-4'>${courseData?.price}</s> ${courseData?.finalPrice}
                        </div>
                      </div>
                    )}
                    <div className='course-detail__overview-btns'>
                      {!courseData?.isBought && (
                        <>
                          <Space>
                            {courseData?.finalPrice !== 0 && (
                              <ButtonCmp
                                onClick={addCartHandler}
                                className='course-detail__overview-add-to-cart btn btn-md btn-secondary'
                              >
                                Add to Cart
                              </ButtonCmp>
                            )}
                            <Button className='course-detail__overview-wishlist-btn'>
                              <HeartOutlined />
                            </Button>
                          </Space>
                          <div>
                            <Space>
                              {courseData?.finalPrice === 0 && (
                                <ButtonCmp
                                  onClick={subscribeCourseHandler}
                                  className='course-detail__overview-enroll-btn btn btn-md btn-primary'
                                >
                                  Enroll now
                                </ButtonCmp>
                              )}
                              {courseData?.finalPrice !== 0 && (
                                <ButtonCmp
                                  onClick={buyNowHandler}
                                  className='course-detail__overview-enroll-btn btn btn-md btn-primary'
                                >
                                  Buy now
                                </ButtonCmp>
                              )}
                            </Space>
                          </div>
                        </>
                      )}

                      {courseData?.isBought && (
                        <Space>
                          <ButtonCmp onClick={gotoCourseHandler} className='btn btn-primary btn-md btn-tertiary'>
                            Go to course
                          </ButtonCmp>
                        </Space>
                      )}

                      <div className='course-detail__overview-guarantee'>30-Day Money-Back Guarantee</div>
                    </div>
                    <div className='course-detail__overview-includes'>
                      <h4 className='course-detail__overview-includes-title'>This course includes:</h4>
                      <List
                        // header={<div>Header</div>}
                        // footer={<div>Footer</div>}
                        dataSource={overviewData}
                        renderItem={(item) => (
                          <List.Item>
                            <Typography.Text>+</Typography.Text> {item}
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* Include section */}
        <div className='course-detail__includes spacing-h-sm container'>
          <Row>
            <Col md={24} lg={16}>
              <div className='container course-detail__includes-wrap'>
                <List
                  header={<div className='course-detail__includes-header'>What you'll learn</div>}
                  footer={<div className='course-detail__includes-footer'>Show more</div>}
                  //   bordered
                  dataSource={courseData}
                  renderItem={(item) => (
                    <List.Item>
                      <Space>
                        <Typography.Text>
                          <CheckOutlined />
                        </Typography.Text>
                        <span>{item}</span>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>
        </div>
        {/* Content section */}
        <div className='course-detail__content container'>
          <Row>
            <Col md={24} lg={16}>
              <h3 className='course-detail__content-title'>Course content</h3>
              <div className='course-detail__content-wrap'>
                <div className='course-detail__content-summary'>
                  <Row className='course-detail__content-summary-row'>
                    <Col md='12'>
                      {numOfSections} sections • {courseData?.lessons} lectures • {formatVideoLengthToHours(courseData?.totalVideosLength || 0)}{' '}
                      total length
                    </Col>
                    <Col className='course-detail__content-summary-col col-right' md='12'>
                      <Link to='/'>Expand all sections</Link>
                    </Col>
                  </Row>
                </div>
              </div>
              {/* Collapse section */}
              {courseId && <SectionList courseId={courseId} />}
            </Col>
          </Row>
        </div>

        {/* Course author */}

        <div className='course-detail__author spacing-h-md'>
          <div className='course-detail__author-wrap container'>
            <Row>
              <Col md={12} className='course-detail__author-info'>
                <p className='course-detail__author-intro'>Meet the intructor</p>
                <h2 className='course-detail__author-name'>{courseData?.userId.name}</h2>
                <p className='course-detail__author-desc'>
                  Patrick Jones is a content marketing professional since 2002. He has a Masters Degree in Digital
                  Marketing and a Bachelors in Education and has been teaching marketing strategies for over 15 years in
                  Chicago. Patrick enjoys teaching all levels and all ages. He looks forward to sharing his love of
                  building meaningful and effective content with all students to develop their marketing abilities.
                </p>
              </Col>
              <Col md={12} className='course-detail__author-avatar'>
                <img
                  className='course-detail__author-img'
                  src={courseData?.userId.avatar || 'https://www.w3schools.com/howto/img_avatar.png'}
                  alt={courseData?.userId.name}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
