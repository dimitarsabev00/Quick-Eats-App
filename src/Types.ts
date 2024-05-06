export interface GeneralSliceInitialState {
  authUser: CurrentUser;
}

interface CurrentUser {
  createdAt: number;
  uid: number;
  email: string;
  photoURL: string;
}
