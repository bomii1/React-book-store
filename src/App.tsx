import Home from './pages/Home';
import Layout from './components/layout/Layout';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { BookStoreThemeProvider } from './context/ThemeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/common/Error';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderList from './pages/OrderList';

const routeList = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/books',
    element: <Books />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/reset',
    element: <ResetPassword />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/book/:bookId',
    element: <BookDetail />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/order',
    element: <Order />
  },
  {
    path: '/orderList',
    element: <OrderList />
  }
];



const router = createBrowserRouter(routeList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />
    };
  })
);

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