import Head from "next/head";
import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import NickNameEditForm from "../components/nickNameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import Router from "next/router";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList header={"팔로잉목록"} data={me.Followings} />
        <FollowList header={"팔로워목록"} data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
