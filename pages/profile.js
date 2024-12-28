import Head from "next/head";
import React from "react";
import AppLayout from "../components/AppLayout";
import NickNameEditForm from "../components/nickNameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const FollowerList = [
    { nickName: "동일" },
    { nickName: "동일" },
    { nickName: "동일" },
  ];
  const FollowingList = [
    { nickName: "동일" },
    { nickName: "동일" },
    { nickName: "동일" },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList header={"팔로잉목록"} data={FollowingList} />
        <FollowList header={"팔로워목록"} data={FollowerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
