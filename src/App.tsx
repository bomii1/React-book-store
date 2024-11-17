import React from 'react';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { BookStoreThemeProvider } from './context/ThemeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/common/Error';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
  element: (
    <Layout>
      <Home />
    </Layout>
  ),
  errorElement: <Error />
  },
  {
    path: '/books',
    element: (
      <Layout>
        <div>도서목록</div>
      </Layout>
    ),
  },
  {
    path: '/signup',
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
  }
])

function App() {
  // const [themeName, setThemeName] = useState<ThemeName>('light'); // light, dart 둘 중에 하나만 들어갈 수 있도록

  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;

// <Layout children={<Home />} />