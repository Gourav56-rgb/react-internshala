import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsCount, getCartTotalAsync } from "../../store/cartSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/apiURL";

function Navbar() {
  const dispatch = useDispatch()
  const itemsCount = useSelector(getCartItemsCount)
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    dispatch(getCartTotalAsync())
  }, [])

  {/*const products = (`${BASE_URL}products`)
  const [productCards, setProductCards] = useState(products)

  useEffect(() => {
    setProductCards([...productCards.sort((a, b) => { return a.price-b.price })])
  }, [])

  function sortProductsByPrice(e) {
    e.stopPropagation()
    if (e.target.value === "LowToHigh") {
      setProductCards([...productCards.sort((a, b) => { return a.price-b.price })])
    }

    if (e.target.value === "HighToLow") {
      setProductCards([...productCards.sort((a, b) => { return b.price-a.price})])
    }
  }*/}

  return (
    <nav className="navbar">
      <div className="navbar-cnt flex align-center">
        <div className="brand-and-toggler flex align-center">
          <button type="button" className="sidebar-show-btn text-white">
            <i className="fas fa-bars"></i>
          </button>
          <Link to="/" className="navbar-brand flex align-center">
            <span className="navbar-brand-ico">
              <i className="fa-solid fa-bag-shopping"></i>
            </span>
            <span className="navbar-brand-txt mx-2">
              <span className="fw-7">Ecommerce</span>
            </span>
          </Link>
        </div>
        <div className="navbar-collapse w-100">
          <div className="navbar-search bg-white">
            <div className="flex align-center">
              <input
                type="text"
                className="form-control fs-14"
                placeholder="Search your preferred items here"
                onChange={(e) => handleSearchTerm(e)}
              />
              <Link
                to={`search/${searchTerm}`}
                className="text-white search-btn flex align-center justify-center"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="navbar-cart flex align-center">
          <Link to="/cart" className="cart-btn">
            <i className="fa-solid fa-cart-shopping"></i>
            <div className='cart-items-value'>{itemsCount}</div>
          </Link>
          <div className="p-10">
          <select name="price" id="price" className="bg-gray" /*onChange={(e) => sortProductsByPrice(e)}*/>
            <option value="LowToHigh" className="bg-black">LowToHigh</option>
            <option value="HighToLow" className="bg-black">HighToLow</option>
          </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
