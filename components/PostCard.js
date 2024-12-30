import {
  EllipsisOutlined,
  MessageOutlined,
  HeartOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Avatar, Button, Card, List, Popover } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import { Comment } from "@ant-design/compatible";
const PostCard = ({ post }) => {
  const [liked, setLike] = useState(false);
  const [commentFromOpened, steCommentFromOpened] = useState(false);
  const id = useSelector((state) => state.user.me?.id);

  const onToggleComment = useCallback(() => {
    steCommentFromOpened((prev) => !prev);
  }, []);

  const onToggelLike = useCallback(() => {
    // setLike(!liked);
    setLike((prev) => !prev);
  }, []);

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images}></PostImages>}
        actions={[
          <RetweetOutlined key="reteweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggelLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggelLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickName}</Avatar>}
          title={post.User.nickName}
          // description={post.content}
        />
      </Card>
      {commentFromOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickName}
                  avatar={<Avatar>{item.User.nickName}</Avatar>}
                  content={item.content}
                ></Comment>
              </li>
            )}
          ></List>
        </div>
      )}

      {/* <CommentForm></CommentForm>
      <Comments /> */}
    </div>
  );
};
export default PostCard;

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    careatedAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }),
};
// import React from "react";
// const PostCard = () => {
//   return <div>card</div>;
// };

// export default PostCard;
