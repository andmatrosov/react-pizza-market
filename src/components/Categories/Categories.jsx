import React from 'react';

const Categories = ({ value, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}
            key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
