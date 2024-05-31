"use client";

import AcmeIcon from "@/assets/icons/acmeIcon";
import EyeIcon from "@/assets/icons/eyeIcon";
import EyeSlashIcon from "@/assets/icons/eyeslashIcon";
import FbookIcon from "@/assets/icons/fbıcon";
import IgIcon from "@/assets/icons/igIcon";
import TwIcon from "@/assets/icons/twIcon";
import UserIcon from "@/assets/icons/userIcon";
import RegisterIcon from "@/assets/icons/userIcon copy";
import useAuthStore from "@/stores/auth-store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation, useRegisterMutation } from "@/hooks/queries/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  Field,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import CloseIcon from "@/assets/icons/closeIcon";
import { useTranslation } from "react-i18next";
import { LanguagePickerDropdown } from "@/core/layouts/LanguagePickerDropdown";
import Spinner from "../components/Spinner";

export type LoginFormValues = {
  email: string;
  password: string;
};

const Home = () => {
  const { t } = useTranslation();
  const { mutate, data, isSuccess, isPending } = useLoginMutation();
  const {
    mutate: registerMutate,
    data: registerData,
    isPending: registerPending,
    isSuccess: registerSuccess,
  } = useRegisterMutation();

  const { setAccessToken } = useAuthStore();
  const router = useRouter();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (data?.data.accessToken && isSuccess) {
      setAccessToken(data?.data.accessToken);
      setTimeout(() => {
        router.push("/dashboard");
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data.token, isSuccess]);

  useEffect(() => {
    if (registerData?.data.accessToken && registerSuccess) {
      setAccessToken(registerData?.data.accessToken);
      setTimeout(() => {
        router.push("/dashboard");
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerData?.data.token, registerSuccess]);

  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .email(t("homePageEmailWarningType"))
        .required(t("homePageEmailRequired"))
        .max(256, t("homePageEmailMax")),
      password: yup
        .string()
        .min(8, t("homePagePasswordMin"))
        .max(16, t("homePagePasswordMax"))
        .required(t("homePagePasswordRequired"))
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/, {
          message: t("homePagePasswordWarningType"),
        }),
    })
    .required();

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    resetField,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (e: LoginFormValues) => {
    mutate({ data: e });
    reset();
    resetField("email");
    resetField("password");
  };

  const handleRegister = async (e: LoginFormValues) => {
    registerMutate({ data: e });
    reset();
    resetField("email");
    resetField("password");
  };

  useEffect(() => {
    if (!openLoginModal) {
      reset();
    }
  }, [openLoginModal, reset]);

  useEffect(() => {
    if (!openRegisterModal) {
      reset();
    }
  }, [openRegisterModal, reset]);

  return (
    <div>
      <div className="flex-col w-full pb-34rem bg-cover justify-between bg-no-repeat bg-center bg-lightgray bg-scroll from-gray-800 via-gray-800 to-transparent bg-[url('../assets/images/homepagebg.jpg')] h-[39.125rem] flex-shrink-0">
        <div className="flex w-full h-5.125rem px-[3.125rem] justify-between align-middle py-[1.3125rem] flex-shrink-0">
          <div>
            <AcmeIcon currentColor={"white"} />
          </div>
          <div className="flex px-0.625rem justify-between items-start gap-[1.25rem]">
            <button
              data-testid="login-button"
              onClick={() => setOpenLoginModal(!openLoginModal)}
              className="flex px-[1.1875rem] py-[0.6875rem] justify-center items-center gap-[0.375rem] rounded-[0.3125rem] bg-gradient-to-r from-blue-600 to-blue-900 text-white text-center font-medium text-sm leading-[1.09375rem]"
            >
              <UserIcon />
              {t("homePageLogin")}
            </button>
            <button
              data-testid="signup-button"
              onClick={() => setOpenRegisterModal(!openRegisterModal)}
              className="flex px-[1.1875rem] py-[0.6875rem] justify-center items-center gap-[0.375rem] rounded-[0.3125rem] bg-gradient-to-r from-blue-600 to-blue-900 text-white text-center font-medium text-sm leading-[1.09375rem]"
            >
              <RegisterIcon />
              {t("homePageSignup")}
            </button>
          </div>
        </div>
        <div className="w-full max-w-[58.375rem] h-13.09963rem flex-shrink-0 p-40 xs:px-2">
          <div className="flex flex-col w-full justify-center items-start gap-[2.5rem]">
            <p className="text-white text-5xl font-semibold leading-[5rem] xs:w-full xs:text-3xl">
              {t("homePageBestPositionEver")}
            </p>
            <p className="text-white text-2xl font-semibold leading-[1.875rem] xs:text-lg">
              {t("homePageHumanResources")}
            </p>
          </div>
        </div>
      </div>

      <div className="h-[24rem] flex w-full p-[3.875rem] justify-center items-center gap-[4.63475rem] bg-white flex-shrink-0 xs:flex-col xs:px-8 xs:pt-8 xs:gap-[2rem] xs:pb-8">
        <div className="flex flex-col items-start gap-[1.625rem] self-stretch xs:items-center">
          <div className="flex items-end gap-6">
            <AcmeIcon currentColor={"#119DFF"} />
            <p className="text-gray-800 text-lg font-semibold leading-125">
              {t("homePageReadyToStart")}
            </p>
          </div>
          <div className="w-38.87288 flex-1 text-base font-normal leading-125">
            <p className="text-gray-700 text-base font-normal leading-125 w-96 flex-1">
              {t("homePageHumanResources")}
            </p>
          </div>
          <div className="flex px-2 items-center gap-5">
            <FbookIcon />
            <TwIcon />
            <IgIcon />
            <LanguagePickerDropdown />
          </div>
        </div>
        <div className="w-[0.0625rem] h-[9.25rem] bg-gray-400 bg-opacity-20 xs:w-full xs:h-[0.0625rem]"></div>
        <div className="flex py-12 px-0 items-center gap-4 xs:py-0">
          <p className="text-gray-700 text-base font-normal leading-125">
            {t("homePageFooterDateRange")}
          </p>
        </div>
      </div>

      <div
        style={{ visibility: openLoginModal ? "visible" : "hidden" }}
        className="p-4 md:p-6 flex-col gap-6overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full md:inset-0 h-[100%] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative flex justify-center h-[30rem] flex-col gap-[1rem] bg-white rounded-lg shadow ">
            {isPending ? (
              <Spinner />
            ) : (
              <>
                <div className="flex items-center p-4 md:p-5 ">
                  <h3 className="text-xl absolute left-48 font-semibold text-gray-900 flex justify-center">
                    {t("homePageLogin")}
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="authentication-modal"
                    onClick={() => setOpenLoginModal(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only"> {t("homePageCloseModal")}</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form
                    className="flex justify-center flex-col gap-[1rem] space-y-4"
                    action="#"
                    data-testid="login-form"
                    onSubmit={handleSubmit(handleLogin)}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="text-gray-700 font-barlow font-medium text-base leading-[1.5rem]"
                      >
                        {t("homePageEmailAddress")}
                      </label>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: true,
                          maxLength: 256,
                        }}
                        render={({
                          field,
                        }: {
                          field: ControllerRenderProps<
                            LoginFormValues,
                            "email"
                          >;
                        }) => (
                          <>
                            <input
                              type="email"
                              data-testid="email"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder={t("homePageEmailPlaceholder")}
                              {...field}
                            />
                            <p>{field.value}</p>
                          </>
                        )}
                      />
                      {errors.email?.message && (
                        <p className="text-gray-700 text-xs">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="text-gray-700 font-barlow font-medium text-base leading-[1.5rem]"
                      >
                        {t("homePagePassword")}
                      </label>
                      <div className="flex justify-center items-center">
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => (
                            <>
                              <input
                                data-testid="password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder={t("homePagePasswordPlaceholder")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                {...field}
                              />
                              <div
                                className="absolute z-50 right-8"
                                style={{ color: "black" }}
                              >
                                {passwordVisible ? (
                                  <div
                                    onClick={() =>
                                      setPasswordVisible(!passwordVisible)
                                    }
                                  >
                                    <EyeIcon />
                                  </div>
                                ) : (
                                  <div
                                    onClick={() =>
                                      setPasswordVisible(!passwordVisible)
                                    }
                                  >
                                    <EyeSlashIcon />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        />
                      </div>
                      {errors.password?.message && (
                        <p className="text-gray-700 text-xs">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="flex px-[1.1875rem] py-[0.6875rem] justify-center items-center gap-[0.375rem] rounded-[0.3125rem] bg-gradient-to-r from-blue-600 to-blue-900 text-white text-center font-medium text-sm leading-[1.09375rem]"
                    >
                      {t("homePageLogin")}
                    </button>
                    <p className="text-sm font-medium text-gray-500 ">
                      {t("homePageDontHaveAnAccount")}
                      <a
                        onClick={() => {
                          setOpenLoginModal(false);
                          setOpenRegisterModal(true);
                        }}
                        href="#"
                        className="text-blue-700 hover:underline "
                      >
                        {t("homePageSignup")}
                      </a>
                    </p>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        style={{ visibility: openRegisterModal ? "visible" : "hidden" }}
        className="p-4 md:p-6 flex-col gap-6overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full md:inset-0 h-[100%] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative flex justify-center h-[30rem] flex-col gap-[1rem] bg-white rounded-lg shadow ">
            {registerPending ? (
              <Spinner />
            ) : (
              <>
                <div className="flex items-center p-4 md:p-5 ">
                  <h3 className="text-xl absolute left-48 font-semibold text-gray-900 flex justify-center">
                    {t("homePageSignup")}
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                    data-modal-hide="authentication-modal"
                    onClick={() => setOpenRegisterModal(false)}
                  >
                    <CloseIcon />
                    <span className="sr-only">{t("homePageCloseModal")}</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form
                    className="flex justify-center flex-col gap-[1rem] space-y-4"
                    action="#"
                    data-testid="register-form"
                    onSubmit={handleSubmit(handleRegister)}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="text-gray-700 font-barlow font-medium text-base leading-[1.5rem]"
                      >
                        {t("homePageEmailAddress")}
                      </label>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: true,
                          maxLength: 256,
                        }}
                        render={({
                          field,
                        }: {
                          field: ControllerRenderProps<
                            LoginFormValues,
                            "email"
                          >;
                        }) => (
                          <input
                            type="email"
                            data-testid="register-email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={t("homePageEmailPlaceholder")}
                            {...field}
                          />
                        )}
                      />
                      {errors.email?.message && (
                        <p className="text-gray-700 text-xs">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="text-gray-700 font-barlow font-medium text-base leading-[1.5rem]"
                      >
                        {t("homePagePassword")}
                      </label>
                      <div className="flex justify-center items-center">
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => (
                            <>
                              <input
                                data-testid="register-password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder={t("homePagePasswordPlaceholder")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                {...field}
                              />
                              <div
                                className="absolute z-50 right-8"
                                style={{ color: "black" }}
                              >
                                {passwordVisible ? (
                                  <div
                                    onClick={() =>
                                      setPasswordVisible(!passwordVisible)
                                    }
                                  >
                                    <EyeIcon />
                                  </div>
                                ) : (
                                  <div
                                    onClick={() =>
                                      setPasswordVisible(!passwordVisible)
                                    }
                                  >
                                    <EyeSlashIcon />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        />
                      </div>
                      {errors.password?.message && (
                        <p className="text-gray-700 text-xs">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="flex px-[1.1875rem] py-[0.6875rem] justify-center items-center gap-[0.375rem] rounded-[0.3125rem] bg-gradient-to-r from-blue-600 to-blue-900 text-white text-center font-medium text-sm leading-[1.09375rem]"
                    >
                      {t("homePageSignup")}
                    </button>
                    <p className="text-sm font-medium text-gray-500 ">
                      {t("homePageAlreadyHaveAnAccount")}
                      <a
                        onClick={() => {
                          setOpenLoginModal(true);
                          setOpenRegisterModal(false);
                        }}
                        href="#"
                        className="text-blue-700 hover:underline "
                      >
                        {t("homePageLogin")}
                      </a>
                    </p>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
