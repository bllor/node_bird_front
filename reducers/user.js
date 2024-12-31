export const initialState = {
  isLoggingIn: false, //로그인 시도중
  isLoggedIn: false,
  isLoggingOut: false, // 로그아웃 시도 중
  me: null,
  signUpData: {},
  loginData: {},
};
export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: "log_out",
  };
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      console.log("re", action.data);
      return {
        ...state,
        isLoggingIn: true,
        isLoggedIn: false,
        me: { ...action.data },
      };
    case "LOG_IN_SUCCESS":
      console.log("sucess", { ...action.data, nickName: "bllor" });
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickName: "bllor" },
      };
    case "LOG_IN_FAILURE":
      console.log("왜일로빠지지?");
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggingOut: true,
        isLoggedIn: false,
        user: action.data,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        user: null,
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default user;
