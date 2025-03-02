import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { store } from './store/store';
import './index.css';
import './assets/styles/antd.css';
import './assets/sass/App.css';
import './assets/sass/reset.css';
import './assets/sass/tailwind.css';

// Create the portal container for notifications
const notificationRoot = document.createElement('div');
notificationRoot.id = 'notification-root';
document.body.appendChild(notificationRoot);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider 
        router={router} 
        future={{
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true
        }}
      />
    </Provider>
  </React.StrictMode>
);
