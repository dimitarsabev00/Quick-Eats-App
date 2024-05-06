export interface GeneralSliceInitialState {
  authUser: CurrentUser;
  loading: boolean;
}

interface CurrentUser {
  createdAt: number;
  uid: number;
  email: string;
  photoURL: string;
}
