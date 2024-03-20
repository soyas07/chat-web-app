import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
