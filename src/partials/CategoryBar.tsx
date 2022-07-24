import React, { useState, useEffect } from 'react';
import '../css/Navbar.scss';

const CategoryBar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);

  const onClickHandler = (e: any, key: number) => {
    setSelected(key);
  };

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
    <div className="category-container" data-aos="slide-down">
      {categories.map((item, idx) => {
        return (
          <span
            className={idx === selected ? 'selected' : 'non-selected'}
            key={idx}
            onClick={(e) => onClickHandler(e, idx)}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default CategoryBar;
