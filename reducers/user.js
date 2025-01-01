import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "saga/user";

export const initialState = {
  loginLoading: false, //로그인 시도중
  loginDone: false,
  loginError: false,
  logOutLoading: false, //로그아웃 시도중
  logOutDone: false,
  logOutError: false,
  signUpLoading: false, //회원가입 시도중
  signUpDone: false,
  signUpError: false,
  me: null,
  signUpData: {},
  loginData: {},
};
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const dummyUser = (data) => ({
  ...data,
  nickName: "bllor",
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      console.log("re", action.data);
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
        me: { ...action.data },
      };
    case LOG_IN_SUCCESS:
      console.log("sucess", { ...action.data, nickName: "bllor" });
      return {
        ...state,
        loginLoading: false,
        loginDone: true,

        me: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        logOutError: null,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
        user: null,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        signUpError: null,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    default:
      return state;
  }
};

export default user;
