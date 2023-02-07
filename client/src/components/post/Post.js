import PostCard from "../postcard/PostCard";

function Post({ post }) {
  return (
    <div>
      <PostCard post={post} />
    </div>
  );
}

export default Post;
