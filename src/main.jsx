import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider  } from "react-router-dom";

import './index.css';
import App from './App.jsx';
import { ModalProvider } from './contexts/ModalContext.jsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ModalProvider>
    </QueryClientProvider>
  </StrictMode>
);
