import { collection, getDocs, query } from "firebase/firestore";
import { FilterSection, Header, Home, HomeSLider } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { db } from "../configs/firebase";
import { Product } from "../Types";
import { setAllProducts } from "../store";
import { useEffect } from "react";

const Main = () => {
  const products = useAppSelector(({ generalSlice }) => generalSlice.products);
  const dispatch = useAppDispatch();

  const getAllProducts = async () => {
    // Fetch all products from Firestore

    const productsQuery = query(collection(db, "products"));
    const querySnapshot = await getDocs(productsQuery);
    const allProducts: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      productId: doc.id,
      imageURL: doc.data().imageURL,
      product_name: doc.data().product_name,
      product_category: doc.data().product_category,
      product_price: doc.data().product_price,
    }));
    dispatch(setAllProducts(allProducts));
  };

  useEffect(() => {
    if (!products.length) {
      getAllProducts();
    }
  }, []);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <h1>Quick-Eats-App Main PAGE!</h1>
        <Home />
        <HomeSLider />
        <FilterSection />
      </div>
    </main>
  );
};

export default Main;
