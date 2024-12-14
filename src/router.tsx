const ProfileWrapper = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  
  if (!userData) return <Navigate to="/" />;

  const user: IUserDetail = {
    ...userData,
    courses: userData.courses.map(course => {
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
    })
  };

  return <Profile user={user} />;
}; 