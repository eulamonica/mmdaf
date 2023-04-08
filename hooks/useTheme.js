import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const currentTheme = window.localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = (value) => {

    setTheme(value);
    window.localStorage.setItem('theme', value);
  };

  return [theme, toggleTheme]
}

export default useTheme;