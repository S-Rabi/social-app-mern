import { useParams } from "react-router-dom";

import ProfileCard from "../../components/profilecard/ProfileCard";
import { useContext } from "react";
import { SocialContext } from "../../context/Context";
import axios from "axios";

function ViewProfile() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  let data = {};
  const { id } = useParams();
  const { state } = useContext(SocialContext);

  console.log("viewProfile id", id);

  if (id === "myprofile") {
    data = state.user;
  } else {
    data = getProfile();

    async function getProfile() {
      const response = await axios.get(baseUrl + "users/profile/" + id, {
        withCredentials: true,
      });
      return response.data.user;
    }
  }
  return (
    <div>
      <h1>Profile Page</h1>

      <ProfileCard data={data} />
    </div>
  );
}

export default ViewProfile;
