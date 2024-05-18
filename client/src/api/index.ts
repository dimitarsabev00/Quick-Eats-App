import axios from "axios";
import { toast } from "react-hot-toast";

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
