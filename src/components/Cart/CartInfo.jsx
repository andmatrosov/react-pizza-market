import React from 'react';
import styles from './CartInfo.module.scss';

const CartInfo = () => {
  return (
    <div className={styles.root}>
      <h1>Корзина пуста 😔</h1>
      <p>Вы пока ничего не добавили...</p>
    </div>
  );
};

export default CartInfo;
