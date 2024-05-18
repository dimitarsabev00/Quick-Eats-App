import axios from "axios";
import { toast } from "react-hot-toast";
import { Product } from "../Types";

export const baseURL =
  "http://localhost:5001/quick-eats-app-1bce5/us-central1/app";

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
