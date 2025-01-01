import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "saga/user";
const FollowButton = ({ post }) => {
  const { me, followLoading, unFollowLoading } = useSelector(
    (state) => state.user
  );
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const dispatch = useDispatch();
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unFollowLoading} onClick={onClickButton}>
      {isFollowing ? "unfollow" : "follow"}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};
export default FollowButton;
