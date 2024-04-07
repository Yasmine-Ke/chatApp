import { create } from "zustand";
import { tokenHelper } from "./tokenHelper";
import { axiosHelper } from "./axiosHelper";
import axios from "axios";

export const useAuth = create((set) => ({
  user: tokenHelper.getUser(),
  access_token: tokenHelper.getToken(),
  isLoading: null,
  error: null,
  errorMsg: null,

  login: async (data, router) => {
    console.log(router, data);
    set({ isLoading: true, errorMsg: null });
    try {
      const response = await axios.post(
        "http://localhost:5000/user/Signin",
        data
      );
      if (!response) {
        return;
      }
      console.log(response);
      //the access token is generated on this endpoint
      tokenHelper.setToken(response.data.access_token);
      tokenHelper.setUser(response.data.user);
      set({ user: response.data.user, access_token: response.access_token });
      router.navigate("/chat");
    } catch (error) {
      console.log(error);
      set({ errorMsg: error });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    tokenHelper.removeToken();
    tokenHelper.removeUser();
  },

  resetPassword: async (newPassword, router) => {
    try {
      set({ isLoading: true });
      const response = await axios.put("/auth/system/reset-password", {
        password: newPassword,
      });
      if (response.result) {
        set((state) => ({ ...state, user: (state.user.tempPassword = false) }));
        router.navigate("/");
      }
    } catch (error) {
      console.log(error);
      // router.navigate("/login",);
    } finally {
      set({ isLoading: false });
    }
  },
}));

const navigateAfterLogin = (tempPassword, router) => {
  if (tempPassword === true) {
    router.navigate("/reset-password");
    return;
  }
  router.navigate("/");
};

const navigateAfterResetPassword = (x, router) => {};
