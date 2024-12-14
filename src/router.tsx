const ProfileWrapper = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  
  if (!userData) return <Navigate to="/" />;

  // Simplified user type without course enrollments
  const user = {
    ...userData,
    courses: [] // Simplified to empty array since we removed course functionality
  };

  return <Profile user={user} />;
}; 