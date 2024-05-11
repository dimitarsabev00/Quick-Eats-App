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
