import Post from "../models/Post.js";

export const add = async (req, res) => {
  try {
    req.body.author = req.user;
    if (req.file) req.body.postImage = req.file.path;
    const post = await Post.create(req.body).populate({
      path: "author",
      select: "username email profileImage",
    });
    res.send({ success: true, post });
  } catch (error) {
    console.log(" add ~ error", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const list = async (req, res) => {
  try {
    console.log("hello post-list ");

    const posts = await Post.find()
      .select("-__v")
      .populate({ path: "author", select: "username email profileImage" });
    // .populate({
    //   path: "likes",
    //   select: "username email profileImage",
    //   options: { sort: { createdAt: -1 } },
    // })
    // .populate({
    //   path: "comments",
    //   select: "-__v",
    //   options: { sort: { createdAt: -1 } },
    // })
    // .populate({
    //   path: "comments.author",
    //   select: "username email profileImage",
    // })
    // .populate({
    //   path: "comments.likes",
    //   select: "username email profileImage",
    //   options: { sort: { createdAt: -1 } },
    // })
    // .populate({
    //   path: "comments.comments",
    //   select: "-__v",
    //   options: { sort: { createdAt: -1 } },
    // })
    // .populate({
    //   path: "comments.comments.author",
    //   select: "username email profileImage",
    // })
    // .populate({
    //   path: "comments.comments.likes",
    //   select: "username email profileImage",
    //   options: { sort: { createdAt: -1 } },
    // })
    // .populate({
    //   path: "comments.comments.comments",
    //   select: "-__v",
    //   options: { sort: { createdAt: -1 } },
    // })
    // .populate({
    //   path: "comments.comments.comments.author",
    //   select: "username email profileImage",
    // })
    // .populate({
    //   path: "comments.comments.comments.likes",
    //   select: "username email profileImage",
    //   options: { sort: { createdAt: -1 } },
    // })
    // .sort({ createdAt: -1 }); // post author // comment author
    res.send({ success: true, posts });
    console.log("list", posts);
  } catch (error) {
    console.log("post-list ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    console.log("hello deletePost ", req.body);

    const deletedPost = await Post.findByIdAndDelete({
      _id: req.body.id,
      author: req.user,
    });

    if (!deletedPost) return res.send({ success: false, errorId: 401 }); // not found

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ deletePost ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const edit = async (req, res) => {
  try {
    console.log("hello post-edit ", req.body);

    const { postId: _id, author, text } = req.body;

    if (req.user !== req.body.author)
      return res.send({ success: false, errorId: 0 });

    const newPost = await Post.findByIdAndUpdate(
      {
        _id,
        author,
      },
      { text },
      { new: true }
    );
    console.log(" edit ~ newPost", newPost);

    res.send({ success: true });
  } catch (error) {
    console.log(" edit ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const like = async (req, res) => {
  try {
    console.log(" hello like ", req.body);

    const post = await Post.findById(req.body.postId);
    console.log("like ~ post", post);

    const liked = post.likes.includes(req.user);
    console.log("like ~ user", user);

    let newPost = {};

    if (liked) {
      // user IS in the likes array

      newPost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $pull: {
            // deletes all items that match the criteria
            likes: req.user,
          },
        },
        { new: true }
      );
      console.log("like ~ newPost", newPost);
    } else {
      // user is NOT in the likes array

      newPost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $addToSet: {
            likes: req.user,
          },
        },
        { new: true }
      );
      console.log("like ~ newPost", newPost);
    }

    res.send({ success: true, likes: newPost.likes });
  } catch (error) {
    console.log("like ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};
