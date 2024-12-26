import React, { useCallback } from "react";
import { Avatar, Button, Card } from "antd";

const UserProfile = ({ setIsLoginedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoginedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹<br></br>0
        </div>,
        <div key="followings">
          팔로잉<br></br>0
        </div>,
        <div key="followings">
          팔로워<br></br>0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>DI</Avatar>} title="dongil"></Card.Meta>
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};
export default UserProfile;
