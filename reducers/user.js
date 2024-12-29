export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};
export const loginAction = (data) => {
  return {
    type: "log_in",
    data,
  };
};

export const logoutAction = () => {
  return {
    type: "log_out",
  };
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "log_in":
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      };
    case "log_out":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default user;
