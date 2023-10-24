import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { selectFilter, setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { selectPagination } from '../redux/slices/paginationSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort: sortType, searchValue } = useSelector(selectFilter);
  const { currentPage } = useSelector(selectPagination);
  const { items, status } = useSelector(selectPizzaData);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const sortBy = sortType.property.replace('-', '');
    const order = sortType.property.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  // Если был первый рендер, то подставляем параметры в URL
  useEffect(() => {
    if (isMounted.current) {
      const querySrting = qs.stringify({
        sortBy: sortType.property,
        categoryId,
        currentPage,
      });
      navigate(`?${querySrting}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в reduce
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.property === params.sortBy);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzasList = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, indx) => <Skeleton key={indx} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>{' '}
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : !searchValue ? (
        <div className="content__items">{status === 'loading' ? skeletons : pizzasList}</div>
      ) : (
        <div className="content__error-info">
          <h2>Мы не нашли пицц с таким названием 🥺</h2> <p>Попробуйте ещё раз.</p>
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default Home;
