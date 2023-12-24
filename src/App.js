import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HomePage,
  CartPage,
  SingleProductPage,
  SearchPage} from "./pages/index";
import Header from "./components/Header/Header";
import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from "./components/auth/components/Login"

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/product/:id" element={<SingleProductPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/search/:searchTerm" element={<SearchPage/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
