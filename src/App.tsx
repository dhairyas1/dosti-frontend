import { ConfigProvider } from 'antd';
import { theme } from './config/antd.config';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

// Import styles
import 'antd/dist/reset.css';
import './styles/global.scss';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App; 