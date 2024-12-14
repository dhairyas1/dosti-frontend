import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space } from '../../../components/antd';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ICourse } from '../../../types/course.type';
import { useGetAllCoursesQuery } from './course.service';
import './Courses.scss';

interface DataCourseType {
  key: string;
  name: React.ReactNode;
  author: string;
  categories: string;
  access: string;
  finalPrice: number;
  price: number;
  learners: number;
  createdAt: string;
  updatedAt: string;
  actions: React.ReactNode;
}

const Courses: React.FC = () => {
  const { data: allCoursesData } = useGetAllCoursesQuery();
  const [courseData, setCourseData] = useState<DataCourseType[]>([]);

  useEffect(() => {
    if (!allCoursesData?.courses) return;

    const sourceCourseData = allCoursesData.courses.map((courseItem) => {
      const {
        _id,
        name,
        description,
        price,
        finalPrice,
        access,
        level,
        thumbnail,
        categoryId,
        userId,
        createdAt,
        updatedAt
      } = courseItem;

      let thumbnailUrl = '';
      if (thumbnail.startsWith('http')) {
        thumbnailUrl = thumbnail;
      } else {
        thumbnailUrl = `${BACKEND_URL}/${thumbnail}`;
      }

      const courseTemplateItem: DataCourseType = {
        key: `${_id}`,
        name: (
          <div className='table__col-name'>
            <img title={name} className='table__col-name-img' src={thumbnailUrl} />
            <span className='table__col-name-text'>{name}</span>
          </div>
        ),
        author: userId?.name,
        categories: categoryId?.name,
        access: access,
        finalPrice: finalPrice,
        price: price,
        learners: 10,
        createdAt: createdAt,
        updatedAt: updatedAt,
        actions: (
          <Fragment>
            <Space>
              <Button>
                <Link to={`/author/courses/${_id}`}>
                  <EditOutlined />
                </Link>
              </Button>
              <Button>
                <EllipsisOutlined />
              </Button>
            </Space>
          </Fragment>
        )
      };

      return courseTemplateItem;
    });

    setCourseData(sourceCourseData);
  }, [allCoursesData]);

  return (
    <div className='courses'>
      <Row gutter={[16, 16]}>
        {courseData.map((course) => (
          <Col key={course.key} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={course.name}
              actions={[course.actions]}
            >
              <Card.Meta
                title={course.author}
                description={
                  <div>
                    <div>Category: {course.categories}</div>
                    <div>Access: {course.access}</div>
                    <div>Price: ${course.finalPrice}</div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Courses;
