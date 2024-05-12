import React from "react";
import { DataTable } from "..";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { HiCurrencyDollar } from "../../assets/icons";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "@firebase/firestore";
import { db } from "../../configs/firebase";
import { setAllProducts } from "../../store";
import { toast } from "react-hot-toast";

const DBItems: React.FC = () => {
  const products = useAppSelector(({ generalSlice }) => generalSlice.products);
  const mutableData = products.map((product) => ({ ...product }));

  const dispatch = useAppDispatch();
  const deleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      toast.success("Product Deleted");

      // Fetch all products from Firestore

      const productsQuery = query(collection(db, "products"));
      const querySnapshot = await getDocs(productsQuery);
      const allProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setAllProducts(allProducts));
    } catch (error: any) {
      toast.error("Failed to delete the product: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-xl font-semibold text-textColor flex items-center justify-center ">
                <HiCurrencyDollar className="text-red-400" />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={mutableData}
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert("You want to edit " + rowData.product_name);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              if (
                window.confirm("Are you sure, you want to perform this action")
              ) {
                deleteProduct(rowData.id);
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
