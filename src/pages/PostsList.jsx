import React from "react";
import { useSelector } from "react-redux";
import {
  selectedPosts,
  getPostsError,
  getPostsStatus,
} from "../features/posts/postsSlice";
import PostsExcerpts from "../components/PostsExcerpts";

const PostsList = () => {
  const posts = useSelector(selectedPosts);

  const postStatus = useSelector(getPostsStatus);

  const postError = useSelector(getPostsError);

  // const dispatch = useDispatch();

  // const count = useSelector(getCount);

  // useEffect(() => {
  //   if (postStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postStatus, dispatch]);

  const anotherFormatPost = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  // const formatedPost = posts.slice().reverse();

  let content;

  if (postStatus === "loading") {
    content = <p>"loading"</p>;
  } else if (postStatus === "succeeded") {
    content = anotherFormatPost.map((post) => (
      <PostsExcerpts
        key={post.id}
        post={post}
      />
    ));
  } else {
    content = <p>{postError}</p>;
  }

  return (
    <section>
      {/* <button
        onClick={() => dispatch(increaseCount())}
        className='btn text-white btn-secondary'
      >
        {count}
      </button> */}
      {content}
    </section>
  );
};

export default PostsList;
