import React, { useContext, useEffect } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import Post from "../post/Post";
import axios from "axios";
import useSWR from "swr";
import { SocialContext } from "../../context/Context";

function Posts() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { state, dispatch } = useContext(SocialContext);

  // const fetcher = async () => {
  //   const res = await axios.get(baseUrl + "/posts/list");
  //   return res.data;
  // };
  // const { data, error, isLoading } = useSWR(baseUrl + "/posts/list", fetcher);

  // console.log("data", data.posts);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error...</div>;

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(baseUrl + "/posts/list", {
        withCredentials: true,
      });
      console.log("🚀 ~ getData ~ response", response);

      if (response.data.success)
        dispatch({
          type: "getPosts",
          payload: response.data.posts,
        });
    };

    getData();
  }, []);
  console.log("state", state);
  return (
    <MDBContainer>
      {state.posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </MDBContainer>
  );
}

export default Posts;
