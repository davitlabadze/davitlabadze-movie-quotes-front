import React, { useState } from 'react';
import BackButton from './BackButton';
import Movietitle from './MovieTitle';

function Header(props) {
  const [header, setHeader] = useState(false);
  const title = props.title;

  const changeBgHeader = () => {
    if (window.scrollY >= 10) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };
  window.addEventListener('scroll', changeBgHeader);
  return (
    <div className={header ? 'w-full fixed bg-black top-0 h-32 ' : ''}>
      <BackButton />
      <Movietitle title={title} />
    </div>
  );
}

export default Header;
