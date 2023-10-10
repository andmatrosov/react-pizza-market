import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortType } from '../../redux/slices/filterSlice';

export const sortList = [
  { name: 'популярности (DESC)', property: 'rating' },
  { name: 'популярности (ASC)', property: '-rating' },
  { name: 'цене (DESC)', property: 'price' },
  { name: 'цене (ASC)', property: '-price' },
  { name: 'алфавиту (DESC)', property: 'title' },
  { name: 'алфавиту (ASC)', property: '-title' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const [isOpen, setIsOpen] = useState(false);

  const sortRef = useRef();

  const onClickSortItem = (item) => {
    dispatch(setSortType(item));
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const path = event.composedPath ? event.composedPath() : event.path;
      console.log(event.composedPath());
      if (!path.includes(sortRef.current)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          transform={isOpen ? 'rotate(180)' : 'rotate(0)'}
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen((prev) => !prev)}>{sort.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((item, indx) => (
              <li
                className={sort.property === item.property ? 'active' : ''}
                onClick={() => onClickSortItem(item)}
                key={indx}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
