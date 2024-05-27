import { FilterSection, Header, Home, HomeSLider } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAllProducts } from "../store";
import { useEffect } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { getAllProducts } from "../api";

const Main = () => {
  const products = useAppSelector(({ generalSlice }) => generalSlice.products);
  const isShoppingCartVisible = useAppSelector(
    ({ generalSlice }) => generalSlice.isShoppingCartVisible
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!products.length) {
      getAllProducts().then((allProducts) =>
        dispatch(setAllProducts(allProducts))
      );
    }
  }, []);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 gap-12 pb-24">
        <Home />
        <HomeSLider />
        <FilterSection />
      </div>

      {isShoppingCartVisible && <ShoppingCart />}
    </main>
  );
};

export default Main;
