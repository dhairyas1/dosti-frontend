import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetCourseDetailQuery } from '../client.service';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { ICourseDetail } from '../../../types/course.type';
import './CourseDetail.scss';

const CourseDetail: React.FC = () => {
  const params = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { courseId } = params;
  const { data } = useGetCourseDetailQuery({ courseId, userId } as { courseId: string; userId: string });

  const courseData = useMemo<ICourseDetail | null>(() => {
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
      categoryId: course.categoryId,
      userId: course.userId,
      author: course.author,
      sections: course.sections || [],
      lessons: course.lessons || [],
      totalVideosLength: course.totalVideosLength,
      avgRatingStars: course.avgRatingStars,
      numOfReviews: course.numOfReviews,
      students: course.students,
      willLearns: course.willLearns || [],
      requirements: course.requirements || [],
      objectives: course.objectives || [],
      forWho: course.forWho || [],
      subTitle: course.subTitle,
      isBought: course.isBought,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt
    };
  }, [data?.course]);

  if (!courseData) return null;

  let thumbnailUrl = '';
  if (courseData.thumbnail.startsWith('https')) {
    thumbnailUrl = courseData.thumbnail;
  } else {
    thumbnailUrl = `${BACKEND_URL}/${courseData.thumbnail}`;
  }

  return (
    <div className="course-detail">
      <div className="course-detail__header">
        <img src={thumbnailUrl} alt={courseData.name} className="course-detail__thumbnail" />
        <div className="course-detail__info">
          <h1>{courseData.name}</h1>
          <p>{courseData.description}</p>
          <div className="course-detail__meta">
            <div className="course-detail__author">
              <img src={courseData.userId.avatar} alt={courseData.userId.name} />
              <span>{courseData.userId.name}</span>
            </div>
            <div className="course-detail__stats">
              <span>{courseData.students} students</span>
              <span>{courseData.numOfReviews} reviews</span>
              <span>{courseData.avgRatingStars.toFixed(1)} rating</span>
            </div>
          </div>
        </div>
      </div>
      {/* Add more sections for course content, curriculum, etc. */}
    </div>
  );
};

export default CourseDetail;
