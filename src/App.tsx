import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { setAdminAuthenticated, setAdminUnauthenticated, setAuthenticated, setUnauthenticated } from './pages/auth.slice';
import { router } from './router';
import './assets/sass/_base.scss';
import './assets/sass/reset.css';
import './assets/sass/tailwind.css';

function App() {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify({ items: [] }));
  }

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the token is stored in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to check for expiration and other details (optional)
      const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds

      // Check if the token has not expired (optional)
      if (Date.now() < expirationTime) {
        // Token is valid, dispatch action to set authentication state
        dispatch(setAuthenticated(token));
      } else {
        // Token has expired, handle accordingly (e.g., prompt user to log in again)
        console.log('Token has expired. Please log in again.');
        // Optionally, you can clear the token from local storage and dispatch a logout action:
        dispatch(setUnauthenticated());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Check if the adminToken is stored in local storage
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      // Decode the token to check for expiration and other details (optional)
      const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(adminToken);
      const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds

      // Check if the token has not expired (optional)
      if (Date.now() < expirationTime) {
        // Token is valid, dispatch action to set authentication state
        dispatch(setAdminAuthenticated(adminToken));
      } else {
        // Token has expired, handle accordingly (e.g., prompt user to log in again)
        console.log('Admin Token has expired. Please log in again.');
        // Optionally, you can clear the token from local storage and dispatch a logout action:
        dispatch(setAdminUnauthenticated());
      }
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
