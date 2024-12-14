import { jwtDecode } from 'jwt-decode';
import { ICourseEnrolledByUser } from './types/course.type';

// ... existing code ...

const mapUserCourses = (courses: string[] | ICourseEnrolledByUser[]): ICourseEnrolledByUser[] => {
  return courses.map(course => {
    if (typeof course === 'string') {
      return {
        _id: course,
        progress: 0,
        totalVideosLengthDone: 0,
        isBought: true,
        lessonsDone: []
      } as ICourseEnrolledByUser;
    }
    return course;
  });
};

// Update jwt-decode calls and user state handling
const decodedToken = jwtDecode(token);
if (decodedToken.courses) {
  decodedToken.courses = mapUserCourses(decodedToken.courses);
}

// ... existing code ... 