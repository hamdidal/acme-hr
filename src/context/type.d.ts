export interface UserModel {
  id: string
  email: string
  profileImage: string
  appliedJobs: string[]
}

export type UserState = {
  user: UserModel;
  setUser: (userData: UserModel) => void;
};
type AuthState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
  isSuccessAdd: boolean;
  setIsSuccessAdd: (isSuccess: boolean) => void;
};
