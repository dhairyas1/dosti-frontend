import React from 'react';
import { Col, Row, Pagination } from '../../../../components/antd';
import { ICourse } from '../../../../types/course.type';
import CourseCard from '../CourseCard';

export interface CourseListProps {
  courses: ICourse[];
  pagination: {
    _limit: number;
    _totalRows: number;
    _page: number;
  };
  onPageChange: (page: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, pagination, onPageChange }) => {
  return (
    <div className="course-list">
      <Row gutter={[24, 24]}>
        {courses.map((course) => (
          <Col key={course._id} xs={24} sm={12} md={8} lg={6}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
      {pagination && (
        <div className="course-list__pagination">
          <Pagination
            current={pagination._page}
            total={pagination._totalRows}
            pageSize={pagination._limit}
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default CourseList;
