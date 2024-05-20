export interface GeneralSliceInitialState {
  authUser: User | null;
  isLoading: boolean;
  products: Product[];
  allUsers: User[];
  shoppingCart: ShoppingCartProduct[];
  isShoppingCartVisible: boolean;
  orders: Order[];
}

export interface Order {
  orderId: number;
  total: string;
  status: string;
  sts: string;
  itemsCount: string;
  customer_details: {
    name: string;
  };
  customer: {
    email: string;
    phone: string;
  };
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
  product_price: number;
  productId?: string;
}
export interface ShoppingCartProduct extends Product {
  quantity: number;
}
