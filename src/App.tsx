import React from 'react';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { BookStoreThemeProvider } from './context/ThemeContext';

function App() {
  // const [themeName, setThemeName] = useState<ThemeName>('light'); // light, dart 둘 중에 하나만 들어갈 수 있도록

  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;

// <Layout children={<Home />} />