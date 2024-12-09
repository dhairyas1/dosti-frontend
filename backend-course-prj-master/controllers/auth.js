exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email }); // Log login attempt

  try {
    if (!email || !password) {
      console.log('Validation error: missing email or password');
      const error = new customError("validation", "Email and password are required!");
      error.statusCode = 422;
      throw error;
    }

    const userDoc = await User.findOne({ email, providerId: "local" });
    console.log('User found:', userDoc ? 'yes' : 'no'); // Log if user was found

    if (!userDoc) {
      console.log('Authentication failed: user not found');
      const error = new customError("auth", "Invalid email or password!");
      error.statusCode = 401;
      throw error;
    }

    const isMatched = await bcrypt.compare(password, userDoc.password);
    console.log('Password match:', isMatched ? 'yes' : 'no'); // Log password match result
    
    if (!isMatched) {
      console.log('Authentication failed: password mismatch');
      const error = new customError("auth", "Invalid email or password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { 
        email: userDoc.email, 
        userId: userDoc._id.toString(),
        role: userDoc.role 
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Save token to database
    userDoc.loginToken = token;
    userDoc.loginTokenExpiration = Date.now() + 60 * 60 * 1000;
    await userDoc.save();

    console.log('Login successful for user:', userDoc.email); // Log successful login
    
    res.status(200).json({
      message: "Login successful!",
      token: token,
      userId: userDoc._id.toString(),
      role: userDoc.role
    });
  } catch (error) {
    console.error('Login error:', error); // Log any errors
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
