import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Menu, Row, Col } from 'antd';

import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import UserProfile from './userProfile';
import LoginForm from './loginForm';

function AppLayout({ children }) {
  const { me } = useSelector((state) => state.user);
  const Global = createGlobalStyle`
    .ant-row{
      margin-right: 0 !important;
      margin-left: 0 !important;
    }

    .ant-col:first-child{
      padding-left: 0 !important;
    }
    .ant-col:last-child{
      padding-right: 0 !important;
    }

  `;

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/" legacyBehavior>
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile" legacyBehavior>
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup" legacyBehavior>
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
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
}

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
