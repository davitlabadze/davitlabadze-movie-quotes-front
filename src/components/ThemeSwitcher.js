import React, { useState } from 'react';
import useDarkSide from 'hooks/useDarkSide';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function ThemeSwitcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div className='z-10 mr-12'>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={24} />
    </div>
  );
}
