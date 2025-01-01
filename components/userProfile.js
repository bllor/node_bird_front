import React, { useCallback } from "react";
import { Avatar, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";
const UserProfile = () => {
  const dispatch = useDispatch();
  // const { me, isLoggingOut } = useSelector((state) => {
  //   state.user;
  // });
  const { me, logOutLoading } = useSelector((state) => state.user);

  console.log("me", me);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹<br></br>
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉<br></br>
          {me.Followings.length}
        </div>,
        <div key="followings">
          팔로워<br></br>
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickName[0]}</Avatar>}
        title={me.nickName}
      ></Card.Meta>
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};
export default UserProfile;
