import Header from "../../components/header/Header";
import CreatePost from "../../components/createPost/CreatePost";
import Posts from "../../components/posts/Posts";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SocialContext } from "../../context/Context";
import { handleImageChange } from "../../utilities/handleImageChange";

function Home() {
  const { state, dispatch } = useContext(SocialContext);

  const [fileData, setFiledata] = useState({
    url:
      state?.user?.coverImage ||
      "https://mdbootstrap.com/img/new/slides/041.webp ",
    file: null,
  });

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const updateCover = (e) => {
    handleImageChange(e, setFiledata);
    uploadCover();
  };

  const uploadCover = async () => {
    const formData = new FormData();

    if (fileData.file) formData.set("image", fileData.file, "coverImage");

    const config = {
      Headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    };

    try {
      const res = await axios.put(`${baseUrl}/users/cover`, formData, config);

      if (res.data.success) {
        dispatch({ type: "updateCover", payload: res.data.coverImage });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Social App ";
  }, []);

  // -------POSTS-----------------

  const [staticModal, setStaticModal] = useState(false);
  const toggleShow = () => setStaticModal(!staticModal);

  const showAddPost = (e) => {
    e.preventDefault();
    toggleShow();
  };

  const addNewPost = async (formData) => {
    console.log("Level 3");
    await axios
      .post(`${baseUrl}/posts/add`, formData, {
        Headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: "addPost", payload: res.data });
          // toggleShow();
        } else if (res.status === 401) {
          dispatch({ type: "logout" });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Header
        updateCover={updateCover}
        fileData={fileData}
        showAddPost={showAddPost}
        heading={state.user.name}
        subheading={"Home Page"}
      />
      <CreatePost
        toggleShow={toggleShow}
        staticModal={staticModal}
        setStaticModal={setStaticModal}
        data={state}
        addNewPost={addNewPost}
      />
      <div className="homeContainer">
        <Posts />
      </div>
    </div>
  );
}

export default Home;
