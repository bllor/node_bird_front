import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_POST_REQUEST } from "saga/post";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      /* 
      window.scrollY:화면을 얼마나 내렸는지
      clientHeight: 화면이 보이는 길이
      scrollHeight: 화면의 총길이

      LOAD_POST_REQUEST가 여러개 보내지는데 그 이유는 스크롤이 이벤트가 한 번에 많이 발생되기 때문
      그래서 throttle을 사용하거나 다른 것을 사용하는 방법이 있다.
      throttle도 요청은 계속 보내므로, loading을 할 때 true, false같은 것을 주어 제어하는 것이 낫다.
      */
      console.log(
        window.scrollY,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight
      );

      if (hasMorePost && !loadPostLoading) {
        if (
          window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
        ) {
          dispatch({
            type: LOAD_POST_REQUEST,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostLoading]);

  return (
    <AppLayout>
      {me && <PostForm></PostForm>}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post}>
          postcard
        </PostCard>
      ))}
    </AppLayout>
  );
};

export default Home;
