import { useDispatch, useSelector } from "react-redux";
import "./HomePage.scss";
import { getAllCategories } from "../../store/categorySlice";
import { useEffect } from "react";
import {
  fetchProductsAsync,
  getAllProducts
} from "../../store/productSlice";
import ProductList from "../../components/ProductList/ProductList";

function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchProductsAsync(50));
  }, []);

  const products = useSelector(getAllProducts);

  // randomizing the products in the list
  const tempProducts = [];
  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  let categoryProductsOne = products.filter(
    (product) => product === categories[0]
  );
  let categoryProductsTwo = products.filter(
    (product) => product === categories[1]
  );
  let categoryProductsThree = products.filter(
    (product) => product === categories[2]
  );
  let categoryProductsFour = products.filter(
    (product) => product === categories[3]
  );

  return (
    <main>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
          <div className="categories-item">
              <ProductList products={tempProducts} />
            </div>
            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[0]}</h3>
              </div>
              <ProductList products={categoryProductsOne} />
            </div>
            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[1]}</h3>
              </div>
              <ProductList products={categoryProductsTwo} />
            </div>
            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[2]}</h3>
              </div>
              <ProductList products={categoryProductsThree} />
            </div>
            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[3]}</h3>
              </div>
              <ProductList products={categoryProductsFour} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
