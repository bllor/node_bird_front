import Head from "next/head";
import React from "react";
import AppLayout from "../components/AppLayout";
import NickNameEditForm from "../components/nickNameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";

const Profile = () => {
  const { me } = useSelector((state) => {
    state.user;
  });

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
