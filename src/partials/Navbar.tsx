import React, { useState, useEffect } from 'react';
import '../css/Navbar.scss';

const Navbar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);
  //   const [lastY, setLastY] = useState(window.scrollY);
  //   const [show, setShow] = useState(true);

  //   useEffect(() => {
  //     const scrollHandler = () => {
  //       const temp = window.pageYOffset;
  //       temp - lastY < 0 ? setShow(false) : setShow(true);
  //       setLastY(temp);
  //       console.log('show', show);
  //     };
  //     window.addEventListener('scroll', scrollHandler);
  //     return () => window.removeEventListener('scroll', scrollHandler);
  //   }, [show]);

  //   const [top, setTop] = useState(true);

  //   // detect whether user has scrolled the page down by 10px
  //   useEffect(() => {
  //     const scrollHandler = () => {
  //       window.pageYOffset > 10 ? setTop(false) : setTop(true);
  //       console.log('==========hi');
  //     };
  //     window.addEventListener('scroll', scrollHandler);
  //     return () => window.removeEventListener('scroll', scrollHandler);
  //   });

  useEffect(() => {
    const temp = [
      'Total',
      'Study',
      'Food',
      'Tech',
      'Music',
      'Movie',
      'Work out',
      'React',
      'Game',
      'Soccer',
      'Restaurant',
    ];
    setCategories(temp);
  }, []);

  return (
    <div className="category-container">
      {categories.map((item, idx) => {
        return (
          <span className={idx === selected ? 'selected' : 'non-selected'}>
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default Navbar;
