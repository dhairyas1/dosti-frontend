import React, { useMemo } from 'react';
import { StarFilled } from '@ant-design/icons';
import { Breadcrumb, Col, List, Row, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { RootState } from '../../../store/store';
import { formatVideoLengthToHours, transformDate } from '../../../utils/functions';
import { useGetCourseDetailQuery, useGetSectionsByCourseIdQuery } from '../client.service';
import './CourseDetail.scss';
import SectionList from './components/SectionList';

const CourseDetail: React.FC = () => {
  const params = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { courseId } = params;
  const { data } = useGetCourseDetailQuery({ courseId, userId } as { courseId: string; userId: string });

  const courseData = useMemo(() => {
    if (!data?.course) return null;
    const course = data.course;
    return {
      _id: course._id,
      name: course.name,
      description: course.description,
      price: course.price,
      finalPrice: course.finalPrice,
      access: course.access,
      level: course.level,
      thumbnail: course.thumbnail,
      courseSlug: course.courseSlug,
      author: course.author,
      sections: course.sections || [],
      lessons: course.lessons || [],
      totalVideosLength: course.totalVideosLength,
      avgRatingStars: course.avgRatingStars,
      numOfReviews: course.numOfReviews,
      students: course.students,
      willLearns: course.willLearns || [],
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

  if (!courseData) return <div>Loading...</div>;

  return (
    <div className='course-detail'>
      <div className='course-detail__wrap spacing-h-sm'>
        <div className='course-detail__intro'>
          <div className='container'>
            <Row gutter={16} className='course-detail__intro-wrap'>
              <Col md={16}>
                <Breadcrumb
                  className='course-detail__breadcrumb'
                  items={[
                    { title: 'Home' },
                    { title: <Link to="/courses">Courses</Link> }
                  ]}
                />

                <h2 className='course-detail__title'>{courseData.name}</h2>
                <p className='course-detail__sub-title'>{courseData.description}</p>
                <div className='course-detail__info'>
                  <div className='course-detail__info-item course-detail__info-rating'>
                    <Space>
                      <span>{courseData.avgRatingStars}</span>
                      <span>
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                        <StarFilled className='rating-icon' />
                      </span>
                      <span>({courseData.numOfReviews} ratings)</span>
                    </Space>
                  </div>
                  <div className='course-detail__info-item course-detail__info-students'>
                    <Space>
                      <span>{courseData.students}</span>
                      <span>students</span>
                    </Space>
                  </div>
                </div>
                <div className='course-detail__intro-author'>
                  <span>Author</span>
                  <Link to={`/user/${courseData.author._id}`} className='course-detail__intro-author-name'>
                    {courseData.author.name}
                  </Link>
                </div>
                <div className='course-detail__intro-updated-at'>
                  Last updated {transformDate(courseData.updatedAt)}
                </div>
              </Col>
              <Col sm={16} md={8} lg={8}>
                <div className='course-detail__overview'>
                  <div className='course-detail__thumbnail'>
                    <img
                      src={thumbnailUrl}
                      alt={courseData.name}
                      className='course-detail__thumbnail-img'
                    />
                  </div>
                  <div className='course-detail__overview-content'>
                    <div className='course-detail__overview-price'>
                      {courseData.finalPrice === 0 ? 'FREE' : `$${courseData.finalPrice}`}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className='course-detail__includes spacing-h-sm container'>
          <Row>
            <Col md={24} lg={16}>
              <div className='container course-detail__includes-wrap'>
                <List
                  header={<div className='course-detail__includes-header'>What you'll learn</div>}
                  dataSource={courseData.willLearns}
                  renderItem={(item: string) => (
                    <List.Item>
                      <Typography.Text>{item}</Typography.Text>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>
        </div>

        <div className='course-detail__content container'>
          <Row>
            <Col md={24} lg={16}>
              <h3 className='course-detail__content-title'>Course content</h3>
              <div className='course-detail__content-wrap'>
                <div className='course-detail__content-summary'>
                  <Row className='course-detail__content-summary-row'>
                    <Col md={12}>
                      {numOfSections} sections • {courseData.lessons.length} lectures • {formatVideoLengthToHours(courseData.totalVideosLength)} total length
                    </Col>
                  </Row>
                </div>
              </div>
              {courseId && <SectionList courseId={courseId} />}
            </Col>
          </Row>
        </div>

        <div className='course-detail__author spacing-h-md'>
          <div className='course-detail__author-wrap container'>
            <Row>
              <Col md={12} className='course-detail__author-info'>
                <p className='course-detail__author-intro'>Meet the instructor</p>
                <h2 className='course-detail__author-name'>{courseData.author.name}</h2>
              </Col>
              <Col md={12} className='course-detail__author-avatar'>
                <img
                  className='course-detail__author-img'
                  src={courseData.author.avatar}
                  alt={courseData.author.name}
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
