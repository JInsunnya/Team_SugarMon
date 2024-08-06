import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './GI/totalGi.jsx';
import reportWebVitals from './reportWebVitals';
import Pick from './GI/foodpick.jsx';
import Pick0 from './GI/foodpick0.jsx';
import Pick1 from './GI/foodpick1.jsx';
import Pick2 from './GI/foodpick2.jsx';
import Pick3 from './GI/foodpick3.jsx';
import TotalGi from './GI/totalGi.jsx';
import Checklist from './checklist/checklist.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'Pick',
    element: <Pick />,
  },
  {
    path: 'Pick0',
    element: <Pick0 />,
  },
  {
    path: 'Pick1',
    element: <Pick1 />,
  },
  {
    path: 'Pick2',
    element: <Pick2 />,
  },
  {
    path: 'Pick3',
    element: <Pick3 />,
  },
  {
    path: 'Checklist',
    element: <Checklist />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
