import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

//이전상태와 액션을 통해서 다음상태를 만드는 것
const RootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  },
  user,
  post,
});

export default RootReducer;

// const initialState = {
//   name: "dongil",
//   age: 30,
//   password: "1234",
// };

//액션
//아래와 같이  액션을 만들 경우 data가 다르면 전부다 만들어주어야 하므로, 동적으로 데이터를 받을 수 있게 만들어야 한다.
// const changeNickName = {
//   type: "change_NickName",
//   data: "bia",
// };

//동적 액션
//데이터를 변수로 받음으로서 동적으로 추가할 수 있게 만듬
const changeNickName = (data) => {
  return {
    type: "change_NickName",
    data,
  };
};
