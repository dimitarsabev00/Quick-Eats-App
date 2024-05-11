export interface GeneralSliceInitialState {
  authUser: CurrentUser;
  isLoading: boolean;
}

interface CurrentUser {
  createdAt: number;
  uid: number;
  email: string;
  photoURL: string;
}
