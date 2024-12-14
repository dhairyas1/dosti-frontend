import { Button, Col, Modal, Row, Space, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { AccessStatus, CourseLevel, ICourse } from '../../../../../types/course.type';
import { useAddCourseMutation } from '../../course.service';
import { handleFormData, openCreateCourse } from '../../course.slice';
import './CreateCourse.scss';
import CreateLeftSide from './components/CreateLeftSide';
import CreateRightSide from './components/CreateRightSide';
import { useGetCategoriesQuery } from '../../../Categories/category.service';

const orderCreateForm = [
  'course-title',
  'course-slug',
  'course-access',
  'course-price',
  'course-thumb',
  'course-delivery'
];

interface CreateCourseData extends Omit<ICourse, '_id'> {
  id?: string;
}

const CreateCourse = () => {
  const isOpen = useSelector((state: RootState) => state.course.isOpenCreateCourse);
  const dispatch = useDispatch();
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const formData = useSelector((state: RootState) => state.course.formData);
  const [addCourse] = useAddCourseMutation();
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const { data: categoriesData } = useGetCategoriesQuery({ _q: '' });

  useEffect(() => {
    if (!isOpen) {
      setCurrentSlideIdx(0);
      dispatch(handleFormData({}));
    }
  }, [isOpen, dispatch]);

  const validateFormData = () => {
    const requiredFields = ['name', 'courseSlug', 'description', 'price'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      notification.error({
        message: 'Missing Required Fields',
        description: `Please fill in the following fields: ${missingFields.join(', ')}`
      });
      return false;
    }
    return true;
  };

  const handleNextSlide = () => {
    if (currentSlideIdx < orderCreateForm.length - 1) {
      setCurrentSlideIdx((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx((prev) => prev - 1);
    }
  };

  const handleFinished = async () => {
    try {
      if (!validateFormData()) return;

      const defaultCategory = categoriesData?.categories?.[0];
      if (!defaultCategory) {
        notification.error({
          message: 'Error',
          description: 'No categories available. Please create a category first.'
        });
        return;
      }

      const courseData: CreateCourseData = {
        name: formData.name || '',
        title: formData.name || '',
        description: formData.description || '',
        thumbnail: formData.thumbnail || '',
        price: Number(formData.price) || 0,
        finalPrice: Number(formData.finalPrice) || Number(formData.price) || 0,
        level: formData.level || CourseLevel.BEGINNER,
        access: formData.access || AccessStatus.DRAFT,
        courseSlug: formData.courseSlug || '',
        categoryId: formData.categoryId || {
          _id: defaultCategory._id,
          name: defaultCategory.name
        },
        userId: {
          _id: adminId || '',
          name: formData.author || 'Admin',
          avatar: ''
        },
        sections: [],
        lessons: [],
        numOfLessons: 0,
        totalTime: 0,
        rating: 0,
        reviews: 0,
        students: 0,
        requirements: formData.requirements || [],
        objectives: formData.objectives || [],
        forWho: formData.forWho || []
      };

      await addCourse(courseData).unwrap();
      notification.success({
        message: 'Course Created',
        description: 'Course has been created successfully!'
      });
      dispatch(openCreateCourse(false));
      dispatch(handleFormData({}));
    } catch (error: any) {
      notification.error({
        message: 'Create Course Failed',
        description: error.data?.message || 'Failed to create course. Please try again.'
      });
    }
  };

  return (
    <Modal
      className='create-course__modal'
      centered
      open={isOpen}
      onCancel={() => dispatch(openCreateCourse(false))}
      width={1000}
      footer={null}
      destroyOnClose
    >
      <Row className='create-course__row'>
        <Col className='create-course__col create-course__col--left' md={10}>
          <div className='create-course__left-bar'>
            <CreateLeftSide dataSlide={orderCreateForm[currentSlideIdx]} />
          </div>
        </Col>
        <Col className='create-course__col create-course__col--right' md={14}>
          <div className='create-course__data'>
            <form className='create-course__form'>
              <div className='create-course__form-wrap'>
                <CreateRightSide dataSlide={orderCreateForm[currentSlideIdx]} />
                <div className='carousel-navigator ms-8'>
                  <Space>
                    <Button 
                      onClick={handlePrevSlide}
                      disabled={currentSlideIdx === 0}
                    >
                      Previous
                    </Button>
                    <div className='carousel-navigator__dots'>
                      {orderCreateForm.map((_, index) => (
                        <span 
                          key={index}
                          className={`carousel-navigator__dots-item ${index === currentSlideIdx ? 'active' : ''}`}
                        />
                      ))}
                    </div>
                    {currentSlideIdx === orderCreateForm.length - 1 ? (
                      <Button type="primary" onClick={handleFinished}>
                        Create Course
                      </Button>
                    ) : (
                      <Button type="primary" onClick={handleNextSlide}>
                        Next
                      </Button>
                    )}
                  </Space>
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateCourse;