const tokenHelper = {
  setToken: (accessToken) => {
    localStorage.setItem("AccessToken", accessToken);
  },
  getToken: () => {
    const x = localStorage.getItem("AccessToken");
    console.log(x);
    return localStorage.getItem("AccessToken");
  },

  removeToken: (key) => {
    return localStorage.removeItem("AccessToken");
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  removeUser: (key) => {
    return localStorage.removeItem("user");
  },
};

export { tokenHelper };
