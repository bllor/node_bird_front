import React, { useState } from "react";
import PropTypes, { symbol } from "prop-types";
import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";

import UserProfile from "./userProfile";
import LoginForm from "./loginForm";
import styled from "styled-components";
const AppLayout = ({ children }) => {
  const [isLoginedIn, setIsLoginedIn] = useState(false);
  console.log(isLoginedIn);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton></SearchInput>
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoginedIn ? (
            <UserProfile setIsLoginedIn={setIsLoginedIn} />
          ) : (
            <LoginForm setIsLoginedIn={setIsLoginedIn} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.naver.com"
            target="_blank"
            rel="noreferrer nopener"
          >
            네이버
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

const SearchInput = styled(Input.Search)`
  vertical-align: "middle";
`;

/*
  children: PropTypes.node.isRequired,
여기서 node는 리액트를 노드를 뜻하며, 화면에 그릴 수 있는 모든 것을 지칭한다.
*/
