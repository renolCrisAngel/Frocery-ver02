import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
  const { name = 'all', category = 'all' } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // const productCategoryList = useSelector((state) => state.productCategoryList);
  // const {
    // loading: loadingCategories,
    // error: errorCategories,
    // categories,
  // } = 
  // productCategoryList;
  useEffect(() => {
    dispatch(
        listProducts({
          name: name !== 'all' ? name : '',
          category: category !== 'all' ? category : '',
        })
      );
    }, [category, dispatch, name]);
  
//     const getFilterUrl = (filter) => {
//       const filterCategory = filter.category || category;
//       const filterName = filter.name || name;
//       return `/search/category/${filterCategory}/name/${filterName}`;
// };

  return (
    <div className="row">
      <div className="row top">
        <div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <><center>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}</center>
              <div class="row center">
					            <div class="arrival__center">
                        {products.map((product) => (
                        <div class="product">
                            <div class="img__container">
                                <div class="card">
                                    <Product key={product._id} product={product}></Product>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}