import axios from "axios";
import { toast } from "react-hot-toast";
import { Product } from "../Types";

export const baseURL =
  "https://us-central1-quick-eats-app-1bce5.cloudfunctions.net/app";

export const validateUserJWTToken = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerfication`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res;
  } catch (err: any) {
    toast.error(err);
  }
};

// add new product
export const addNewProduct = async (data: Product) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data.data;
  } catch (err: any) {
    toast.error(err);
  }
};

// get all products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    return res.data.data;
  } catch (err: any) {
    toast.error(err);
  }
};

// delete product
export const deleteProduct = async (productId: number) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// add an item to shoppingCart
export const addItemToShoppingCart = async (
  userId: string | undefined,
  data: Product
) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/addToShoppingCart/`, {
      ...data,
      userId,
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// get shoppingCart
export const getShoppingCart = async (userId: string | undefined) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getShoppingCart/${userId}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// get all orders
export const getAllOrders = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/orders`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// update the order status
export const updateOrderStatus = async (order_id: number, sts: string) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrders/${order_id}`,
      null,
      { params: { sts: sts } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};
