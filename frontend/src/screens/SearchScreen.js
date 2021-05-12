import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
  const { name = 'all' } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts({ name: name !== 'all' ? name : '' }));
  }, [dispatch, name]);
  return (
    <div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div className="row top">
        <div className="col-3">
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