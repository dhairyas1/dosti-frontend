import { CloseOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Select, Space } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { useGetAuthorsQuery, useGetCategoriesQuery, useGetCoursesQuery } from '../client.service';
import CourseList from '../components/CourseList';
import './Courses.scss';

interface FilterParams {
  _author: string[];
  _level: string[];
  _price: string[];
  _topic: string[];
  _page: number;
}

interface SortParams {
  sort: string;
}

interface CourseListProps {
  courses: ICourse[];
  pagination: {
    _limit: number;
    _totalRows: number;
    _page: number;
  };
  onPageChange: (page: number) => void;
}

const Courses: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const searchValue = searchParams.get('_q') || '';
  const sortValue = searchParams.get('_sort') || 'relevant';
  const authorValue = searchParams.getAll('_author') || [];
  const levelValue = searchParams.getAll('_level') || [];
  const priceValue = searchParams.getAll('_price') || [];
  const topicValue = searchParams.getAll('_topic') || [];

  const params = {
    _limit: searchParams.get('_limit') ? Number(searchParams.get('_limit')) : 12,
    _page: searchParams.get('_p') ? Number(searchParams.get('_p')) : 1,
    _q: searchValue,
    _author: authorValue,
    _level: levelValue,
    _price: priceValue,
    _sort: sortValue,
    _topic: topicValue,
    userId
  };

  const { data, isFetching } = useGetCoursesQuery(params);
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: authorsData } = useGetAuthorsQuery();

  const isFiltered = authorValue.length > 0 || levelValue.length > 0 || priceValue.length > 0;
  const numberOfResult = data?.pagination._totalRows || 0;
  const categoriesList = categoriesData?.categories || [];
  const authorsList = authorsData?.authors || [];
  const levelList = ['All Level', 'Beginner', 'Intermediate', 'Advanced'];

  const navigate = useNavigate();

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('_sort', value);
    setSearchParams(newParams);
  };

  const handleAuthorFilter = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    const newParams = new URLSearchParams(searchParams);
    
    if (checked) {
      newParams.append('_author', value);
    } else {
      const values = newParams.getAll('_author').filter(v => v !== value);
      newParams.delete('_author');
      values.forEach(v => newParams.append('_author', v));
    }
    
    setSearchParams(newParams);
  };

  const handleLevelFilter = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    const newParams = new URLSearchParams(searchParams);
    
    if (checked) {
      newParams.append('_level', value);
    } else {
      const values = newParams.getAll('_level').filter(v => v !== value);
      newParams.delete('_level');
      values.forEach(v => newParams.append('_level', v));
    }
    
    setSearchParams(newParams);
  };

  const handlePriceFilter = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    const newParams = new URLSearchParams(searchParams);
    
    if (checked) {
      newParams.append('_price', value);
    } else {
      const values = newParams.getAll('_price').filter(v => v !== value);
      newParams.delete('_price');
      values.forEach(v => newParams.append('_price', v));
    }
    
    setSearchParams(newParams);
  };

  const handleTopicFilter = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    const newParams = new URLSearchParams(searchParams);
    
    if (checked) {
      newParams.append('_topic', value);
    } else {
      const values = newParams.getAll('_topic').filter(v => v !== value);
      newParams.delete('_topic');
      values.forEach(v => newParams.append('_topic', v));
    }
    
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('_p', page.toString());
    setSearchParams(newParams);
  };

  return (
    <div className='courses'>
      <div className='courses__wrap container spacing-h-sm'>
        <h2 className='courses__heading'>Find your best courses</h2>
        
        <div className='courses__search-results'>
          <div className='courses__search-results-left'>
            {searchValue && (
              <h3 className='courses__search-results-text'>
                {numberOfResult} results for "{searchValue}"
              </h3>
            )}
          </div>
          
          <div className='courses__search-results-right'>
            <Space>
              <Select
                value={sortValue}
                style={{ width: 160 }}
                onChange={handleSortChange}
                options={[
                  { value: 'relevant', label: 'Most Relevant' },
                  { value: 'mostReviews', label: 'Most Reviews' },
                  { value: 'highestRated', label: 'Highest Rated' },
                  { value: 'newest', label: 'Newest' }
                ]}
              />
              
              {isFiltered && (
                <Button 
                  icon={<CloseOutlined />}
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )}
            </Space>
          </div>
        </div>

        <div className='courses__content'>
          <div className='courses__filter-bar'>
            <div className='courses__filter-section'>
              <h3 className='courses__filter-title'>Authors</h3>
              <Space direction="vertical">
                {authorsList.map((author) => (
                  <Checkbox
                    key={author[1]._id}
                    value={author[1]._id}
                    checked={authorValue.includes(author[1]._id)}
                    onChange={handleAuthorFilter}
                  >
                    {author[1].name}
                  </Checkbox>
                ))}
              </Space>
            </div>

            <hr className="courses__divider" />

            <div className='courses__filter-section'>
              <h3 className='courses__filter-title'>Level</h3>
              <Space direction="vertical">
                {levelList.map((level) => (
                  <Checkbox
                    key={level}
                    value={level}
                    checked={levelValue.includes(level)}
                    onChange={handleLevelFilter}
                  >
                    {level}
                  </Checkbox>
                ))}
              </Space>
            </div>

            <hr className="courses__divider" />

            <div className='courses__filter-section'>
              <h3 className='courses__filter-title'>Price</h3>
              <Space direction="vertical">
                <Checkbox
                  value="free"
                  checked={priceValue.includes('free')}
                  onChange={handlePriceFilter}
                >
                  Free
                </Checkbox>
                <Checkbox
                  value="paid"
                  checked={priceValue.includes('paid')}
                  onChange={handlePriceFilter}
                >
                  Paid
                </Checkbox>
              </Space>
            </div>

            <hr className="courses__divider" />

            <div className='courses__filter-section'>
              <h3 className='courses__filter-title'>Topics</h3>
              <Space direction="vertical">
                {categoriesList.map((category) => (
                  <Checkbox
                    key={category._id}
                    value={category._id}
                    checked={topicValue.includes(category._id)}
                    onChange={handleTopicFilter}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </Space>
            </div>
          </div>

          <div className='courses__list'>
            {isFetching ? (
              <div>Loading courses...</div>
            ) : (
              <CourseList 
                courses={data?.courses || []}
                pagination={data?.pagination}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
