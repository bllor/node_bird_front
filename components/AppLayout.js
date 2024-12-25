import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>노드버드</a>
        </Link>
        <Link href="/profile">
          <a>프로필</a>
        </Link>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

AppLayout.proTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

/*
  children: PropTypes.node.isRequired,
여기서 node는 리액트를 노드를 뜻하며, 화면에 그릴 수 있는 모든 것을 지칭한다.
*/
