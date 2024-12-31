import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";

function loginAPI(data) {
  console.log("loginAPI", data);
  return "요청";
}
//call을 사용할 경우 (함수명,변수~~) 이렇게 사용한다.
//yield를 넣어놓으면 테스트할 때 편하다.
function* login(action) {
  try {
    console.log("saga", action);
    // const result = yield call(loginAPI, action.data);
    console.log("Before delay");
    yield delay(1000);
    console.log("After delay");
    console.log("Dispatching LOG_IN_SUCCESS with data:", action.data);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
    });
  } catch (err) {
    const errorMessage = err.response
      ? err.response.data
      : err.message || "An error occurred";
    console.log("error", errorMessage);
    yield put({
      type: "LOG_IN_FAILURE",
      data: errorMessage,
    });
  }
}

function logoutAPI() {
  return "요청";
}
function* logout(action) {
  try {
    // const result = yield call(logoutAPI);
    yield 1000;
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  //로그인 액션이 실행될 때까지 기다린다.
  //얘네들이 이벤트 리스너처럼 동작한다.
  //take로 되어 있으면 함수를 한 번 호출할 경우, 다음에는 호출이 되지 않아서 takeEvery를 사용한다.
  //while과 take를 사용할 수도 있는데, 직관적이지 않으므로 takeEvery를 사용한다
  //while, take는 동기적이고, takeEvery는 비동기적으로 작동한다.
  //TakeLatest:마지막에 호출된 것만 호출한다 -> 대기중이거나 동작이 완료되지 않은 것만 취소하고, 완료될 경우 취소되지 않는다.
  //takeLatest의 단점은 응답만 취소하고, 요청은 취소하지 못한다.
  //게시글 등록을 할 때 요청을 2번보내면 2번다 백에 저장이 되지만, 응답은 1번만 온다.
  //throttle(type,fucntion,time)time안에 요청이 올 경우 해당 요청의 응답을 취소한다.

  yield takeLatest("LOG_IN_REQUEST", login);
}

function* watchLogout() {
  yield takeLatest("LOG_OUT_REQUEST", logout);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
