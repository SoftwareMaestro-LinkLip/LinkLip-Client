import { Dispatch, FunctionComponent, useState, useEffect } from 'react';
import '../css/reset.css';
import { SearchContainer, CategoryContainer } from '../css/Containers';
import useInput from '../hooks/useInput';
import axios from 'axios';

interface IProps {
  getContents: (term: string) => void;
}

const NavBar: FunctionComponent<IProps> = ({ getContents }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);
  const [term, onChangeTerm] = useInput('');

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    // axios.get(`/api/product/products_by_id?term=${term}&type=single`)
    event.preventDefault();
    console.log('term', term);
    getContents(term);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTerm(e);
  };

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
    <div data-aos="slide-down">
      <SearchContainer>
        <form onSubmit={onSubmitHandler}>
          <input
            type="search"
            className="form-control relative min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            onChange={onChangeHandler}
          />
          <button type="submit">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              className="w-4"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </form>
      </SearchContainer>
      <CategoryContainer>
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
      </CategoryContainer>
    </div>
  );
};

export default NavBar;
