import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

//fork는 비동기 호출함수, call은 동기호출함수
import postSaga from "./post";
import userSaga from "./user";

export default function* rootSaga() {
  //all은 배열 내의 모든 제너레이터를 실행시켜 준다.

  yield all([fork(postSaga), fork(userSaga)]);
}
