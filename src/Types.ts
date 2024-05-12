export interface GeneralSliceInitialState {
  authUser: User | null;
  isLoading: boolean;
  products: Product[];
  allUsers: User[];
}

export interface User {
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
