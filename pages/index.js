import React from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  console.log("mainPost", mainPosts);
  mainPosts.map((post) => {
    console.log("id", post.id);
  });

  return (
    <AppLayout>
      {isLoggedIn && <PostForm></PostForm>}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post}>
          postcard
        </PostCard>
      ))}
    </AppLayout>
  );
};

export default Home;
