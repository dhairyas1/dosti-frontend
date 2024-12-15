import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useGetAuthorsQuery } from '../../../../site/client.service';
import { useGetCategoriesQuery } from '../../../Categories/category.service';
import { useGetCoursesQuery } from '../../course.service';
import './CoursesList.scss';

enum Access {
  PAID = 'PAID',
  FREE = 'FREE',
  DRAFT = 'DRAFT',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

interface DataCourseType {
  key: React.Key;
  name: any;
  author: string;
  categories: string;
  access: Access;
  finalPrice: number;
  price: number;
  learners: number;
  createdAt: string;
  updatedAt: string;
  actions?: any;
}

interface CoursesListProps {
  courseData: DataCourseType[];
}

const CoursesList: React.FC<CoursesListProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.courseData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(props.courseData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='course-list'>
      <div className='table-container'>
        <table className='data-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Categories</th>
              <th>Access</th>
              <th>Final Price</th>
              <th>Price</th>
              <th>Learners</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.key}>
                <td>{item.name}</td>
                <td>{item.author}</td>
                <td>{item.categories}</td>
                <td>{item.access}</td>
                <td>${item.finalPrice}</td>
                <td>${item.price}</td>
                <td>{item.learners}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
                <td>{item.actions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className='pagination'>
          <button
            className='pagination-btn'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button
            className='pagination-btn'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesList;
