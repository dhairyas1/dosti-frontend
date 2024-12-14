const ProfileWrapper = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  
  if (!userData) return <Navigate to="/" />;

  const user: IUserDetail = {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    role: userData.role || UserRole.USER,
    courses: userData.courses || [], // This will now be ICourseEnrolledByUser[]
    password: userData.password,
    avatar: userData.avatar,
    address: userData.address,
    phone: userData.phone,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
    loginToken: userData.loginToken,
    loginTokenExpiration: userData.loginTokenExpiration,
    lastLogin: userData.lastLogin,
    providerId: userData.providerId,
    fbUserId: userData.fbUserId
  };

  return <Profile user={user} />;
}; 