import Head from "next/head";
import React, { useCallback, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Button, Checkbox, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import styled from "styled-components";

const Signup = () => {
  const [id, onChangeId] = useInput("");
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

  const onSubmit = useCallback(
    (e) => {
      console.log("1", passwordCheck);
      if (password !== passwordCheck) {
        console.log("11", password, "|", passwordCheck);
        return setPasswordError(true);
      }
      console.log("111");
      console.log("term", term);
      if (!term) {
        console.log("1111å");
        console.log("term", term);
        return setTermError(true);
      }
      console.log(id, nickName, password);
    },
    [password, passwordCheck, term]
  );

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br></br>
          <Input
            name="userId"
            value={id}
            required
            onChange={onChangeId}
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
          <Button type="primary" htmlType="submit">
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
