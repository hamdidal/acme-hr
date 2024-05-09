export type LoginServiceDatas = {
  email: string;
  password: string;
};
export interface LoginServiceResponse {
  accessToken: string
  tokenType: string
  refreshToken: string
  user: User
}

export interface User {
  id: string
  email: string
  profileImage: string
  appliedJobs: string[]
}

export type LoginServiceVariables = {
  data: LoginServiceDatas;
};

export type RegisterServiceDatas = {
  email: string;
  password: string;
};

export interface RegisterServiceResponse {
  accessToken: string
  tokenType: string
  refreshToken: string
  user: User
}

export interface User {
  id: string
  email: string
  profileImage: string
  appliedJobs: string[]
}

export type RegisterServiceVariables = {
  data: RegisterServiceDatas;
};

