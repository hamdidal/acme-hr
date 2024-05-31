export interface UserModel {
  id: string;
  email: string;
  profileImage: string;
  appliedJobs: string[];
}

export type UserState = {
  user: UserModel;
  setUser: (userData: UserModel) => void;
  isSuccess: boolean;
  setIsSuccess: (success: boolean) => void;
};
export type AuthState = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
  isSuccessAdd: boolean;
  setIsSuccessAdd: (isSuccess: boolean) => void;
};
