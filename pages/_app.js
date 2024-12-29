import PropTypes from "prop-types";
// import "antd/dist/antd.css"; // 전체 Ant Design 스타일을 포함
import React, { useEffect } from "react";
import Head from "next/head";
import wrapper from "../store/configure-store";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
