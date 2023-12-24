import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSearchProductAsync,
  getSearchProducts,
  clearSearch,
} from "../../store/searchSlice";
import { useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList";

function SearchPage() {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const searchProducts = useSelector(getSearchProducts);

  useEffect(() => {
    dispatch(clearSearch());
    dispatch(fetchSearchProductAsync(searchTerm));
  }, [searchTerm]);

  return (
    <main>
      <div className="search-content bg-whitesmoke">
        <div className="container">
          <div className="py-5">
            <br />
            <ProductList products={searchProducts} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default SearchPage;
