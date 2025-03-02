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

const initStateCourse: ICourse = {
  _id: '',
  name: '',
  title: '',
  description: '',
  price: 0,
  finalPrice: 0,
  access: AccessStatus.FREE,
  level: CourseLevel.BEGINNER,
  thumbnail: '',
  courseSlug: '',
  author: '',
  topics: [],
  duration: 0,
  categoryId: {
    _id: '',
    name: ''
  },
  userId: {
    _id: '',
    name: '',
    avatar: ''
  }
};

const orderCreateForm = [
  'course-title',
  'course-slug',
  'course-access',
  'course-price',
  'course-thumb',
  'course-delivery'
];

const CreateCourse = () => {
  const isOpen = useSelector((state: RootState) => state.course.isOpenCreateCourse);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const formData = useSelector((state: RootState) => state.course.formData);
  const [addCourse, addCourseResult] = useAddCourseMutation();
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  // Added categories query at component level
  const { data: categoriesData } = useGetCategoriesQuery({ _q: '' });

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  const handleNextSlide = () => {
    if (currentSlideIdx < orderCreateForm.length - 1) {
      setCurrentSlideIdx((prev) => prev + 1);
    }
  };

  const handleFinished = () => {
    let courseData = { ...formData };
    
    // If no category is selected, pick a random one from available categories
    if (!formData.categoryId._id && categoriesData?.categories?.length) {
      const randomIndex = Math.floor(Math.random() * categoriesData.categories.length);
      const randomCategory = categoriesData.categories[randomIndex];
      courseData.categoryId = {
        _id: randomCategory._id,
        name: randomCategory.name
      };
    }
  
    const newCourse = {
      ...courseData,
      userId: {
        _id: adminId,
        name: 'DEV',
        avatar: ''
      }
    };
  
    addCourse(newCourse)
      .unwrap()
      .then((result) => {
        console.log(result);
        notification.success({
          message: 'Add Course',
          description: 'Add course successfully!'
        });
        dispatch(handleFormData(initStateCourse));
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: 'Add Course',
          description: 'Add course failed!'
        });
      });
  };

  const handlePrevSlide = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx((prev) => prev - 1);
    }
  };

  return (
    <div className='create-course'>
      <Modal
        className='create-course__modal'
        centered
        open={open}
        onOk={() => dispatch(openCreateCourse(false))}
        onCancel={() => dispatch(openCreateCourse(false))}
        width={1000}
        bodyStyle={{
          height: '50rem'
        }}
      >
        <Row className='create-course__row'>
          <Col className='create-course__col create-course__col--left' md={10}>
            <div className='create-course__left-bar'>
              <div className='left-bar'>
                <CreateLeftSide dataSlide={orderCreateForm[currentSlideIdx]} />
              </div>
            </div>
          </Col>
          <Col className='create-course__col create-course__col--right' md={14}>
            <div className='create-course__data'>
              <form action='' className='create-course__form'>
                <div className='create-course__form-wrap'>
                  <CreateRightSide dataSlide={orderCreateForm[currentSlideIdx]} />
                  <div className='carousel-navigator ms-8'>
                    <Space>
                      <div className='carousel-navigator__prev'>
                        <Button onClick={handlePrevSlide}>Previous</Button>
                      </div>
                      <div className='carousel-navigator__dots'>
                        <span className='carousel-navigator__dots-item'></span>
                        <span className='carousel-navigator__dots-item'></span>
                        <span className='carousel-navigator__dots-item'></span>
                        <span className='carousel-navigator__dots-item'></span>
                      </div>
                      <div className='carousel-navigator__next'>
                        {currentSlideIdx === orderCreateForm.length - 1 ? (
                          <Button onClick={handleFinished}>Finished</Button>
                        ) : (
                          <Button onClick={handleNextSlide}>Next</Button>
                        )}
                      </div>
                    </Space>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default CreateCourse;