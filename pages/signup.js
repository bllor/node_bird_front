import Head from "next/head";
import React, { useCallback, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Button, Checkbox, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { SIGN_UP_REQUEST } from "saga/user";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickName, onChangeNickName] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickName, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickName },
    });
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br></br>
          <Input
            name="userEmail"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          ></Input>
        </div>
        <div>
          <label htmlFor="user-nickName">닉네임</label>
          <br></br>
          <Input
            name="userNickName"
            required
            value={nickName}
            onChange={onChangeNickName}
          ></Input>
        </div>

        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br></br>
          <Input
            type="password"
            name="userPassword"
            value={password}
            required
            onChange={onChangePassword}
          ></Input>
        </div>
        <div>
          <label htmlFor="user-passwordCheck">비밀번호체크</label>
          <br></br>
          <Input
            type="password"
            value={passwordCheck}
            name="userPasswordCheck"
            required
            onChange={onChangePasswordCheck}
          ></Input>
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            공부를 열심히 하겠습니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            제출하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;

const ErrorMessage = styled.div`
  color: red;
`;
