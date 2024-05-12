export interface GeneralSliceInitialState {
  authUser: CurrentUser | null;
  isLoading: boolean;
}

interface CurrentUser {
  createdAt: number;
  uid: number;
  email: string;
  photoURL: string;
}

export interface Product {
  imageURL: string;
  product_name: string;
  product_category: string;
  product_price: string;
  productId: string;
}
