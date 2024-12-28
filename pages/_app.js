import PropTypes from "prop-types";
import "antd/dist/reset.css";
import React from "react";
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
