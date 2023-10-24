import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem, selectCartItemById } from '../redux/slices/cartSlice';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    types: number[];
    sizes: number[];
    id: number;
  }>();
  const [pizzaSize, setPizzaSize] = useState<number>(0);
  const [pizzaType, setPizzaType] = useState<number>(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const typeNames = ['тонкое', 'традиционное'];

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://65103dd23ce5d181df5d0de9.mockapi.io/items?id=${id}`,
        );
        setPizza(data[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  interface Pizza {
    title: string;
    price: number;
    imageUrl: string;
    id: number;
  }

  type argsArr = [Pizza, number, number];

  const handleAddButton = (arr: argsArr): void => {
    const { title, price, imageUrl, id } = arr[0];
    const pizzaSize = arr[1];
    const pizzaType = arr[2];
    dispatch(addItem({ title, price, imageUrl, pizzaSize, pizzaType, id }));
  };

  if (!pizza) {
    return (
      <div className="container">
        <h2>Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className="container container--pizza-full">
      <div className="pizza-full__img">
        <img src={pizza.imageUrl} alt="" />
      </div>
      <div className=" pizza-full__selector">
        <h2>{pizza.title}</h2>
        <div className="pizza-block__selector">
          <ul>
            {pizza.types.map((typeId) => (
              <li
                key={typeId}
                className={pizzaType === typeId ? 'active' : ''}
                onClick={() => setPizzaType(typeId)}>
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {pizza.sizes.map((size, indx) => (
              <li
                key={indx}
                className={pizzaSize === indx ? 'active' : ''}
                onClick={() => setPizzaSize(indx)}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-full__bottom">
          <h4>от {pizza.price} ₽</h4>{' '}
          <button
            className="button button--outline button--add"
            onClick={() => handleAddButton([pizza, pizzaSize, pizzaType])}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
