import Header from "../../components/header/Header";

import Posts from "../../components/posts/Posts.js";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SocialContext } from "../../context/Context";
import { handleImageChange } from "../../utilities/handleImageChange";

function Home() {
  const { state, dispatch } = useContext(SocialContext);
  console.log("coverImage", state.user);
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
  return (
    <div>
      <Header data={state.user} updateCover={updateCover} fileData={fileData} />
      <div className="homeContainer">
        <Posts />
      </div>
    </div>
  );
}

export default Home;
