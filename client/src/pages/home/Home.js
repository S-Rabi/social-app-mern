import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";

import Posts from "../../components/posts/Posts.js";

function Home() {
  return (
    <div>
      <NavBar />
      <Header />
      <div className="homeContainer">
        <Posts />
      </div>
    </div>
  );
}

export default Home;
