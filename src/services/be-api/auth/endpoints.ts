import { Request } from "@/services/_base";
import { Service } from "@/services/types";
import { GET_PROFILE, LOGIN_URL, REGISTER_URL } from "./constants";
import { LoginServiceVariables, RegisterServiceVariables } from "./types";
import { useMutation } from "@tanstack/react-query";

export const login: Service<LoginServiceVariables> = ({ data }) => {
  return Request.post(LOGIN_URL, data, {});
};

export const register: Service<RegisterServiceVariables> = ({ data }) => {
  return Request.post(REGISTER_URL, data, {});
};

export const getProfile = () => {
  return Request.get(GET_PROFILE, {});
};
