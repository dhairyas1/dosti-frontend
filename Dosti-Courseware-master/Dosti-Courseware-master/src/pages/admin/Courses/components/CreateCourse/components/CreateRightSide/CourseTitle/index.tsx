import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/store';
import { ICategory } from '../../../../../../../../types/category.type';
import { useGetCategoriesQuery } from '../../../../../../Categories/category.service';
import { handleFormData } from '../../../../../course.slice';
import './CourseTitle.scss';

const CourseTitle = () => {
  const { data: categoriesData, isFetching } = useGetCategoriesQuery({ _q: '' });
  const formData = useSelector((state: RootState) => state.course.formData);
  const dispatch = useDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleFormData({
      field: 'name',
      value: e.target.value
    }));
  };

  const handleSubTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(handleFormData({
      field: 'subTitle',
      value: e.target.value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    dispatch(handleFormData({
      field: 'categoryId',
      value: {
        _id: e.target.value,
        name: selectedOption.text
      }
    }));
  };

  return (
    <div className='course-title'>
      <div className='course-title__wrap'>
        <h3 className='course-title__title'>Write a title for your course</h3>

        <p className='course-title__desc'>
          Craft a catchy title and capture your students' imagination. Make it short, precise, memorable and SEO
          friendly by including strong keywords in it.
        </p>
        <div className='course-title__input-group'>
          <label htmlFor='title' className='course-title__input-label'>
            Your title
          </label>
          <input
            id="title"
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            className='course-title__input-input'
            placeholder='Your course title. Ex: Learning C Programm'
          />
        </div>

        <div className='course-title__input-group mt-8'>
          <label htmlFor='category' className='course-title__input-label me-4 block'>
            Course Categories
          </label>
          <select
            id="category"
            value={formData.categoryId?._id}
            onChange={handleCategoryChange}
            className='course-title__input-input'
          >
            <option value="">Select a category</option>
            {categoriesData?.categories.map((cate: ICategory) => (
              <option key={cate._id} value={cate._id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>

        <div className='course-title__input-group mt-8'>
          <label htmlFor='subtitle' className='course-title__input-label me-4 block'>
            Course sub title
          </label>
          <textarea 
            id="subtitle"
            rows={4} 
            value={formData.subTitle} 
            onChange={handleSubTitleChange}
            className='course-title__input-input'
          />
        </div>
      </div>
    </div>
  );
};

export default CourseTitle;
