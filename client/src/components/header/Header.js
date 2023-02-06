import React from "react";

export default function App({ updateCover, fileData, data }) {
  console.log("filedata header", fileData);
  return (
    <header>
      <label className="d-block">
        <div
          className="p-5 mb-7 text-center bg-image"
          style={{
            backgroundImage: `url(${fileData.url})`,
            height: 400,
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3">{data.name}</h1>
                <h4 className="mb-3">Home Page</h4>
                <a
                  className="btn btn-outline-light btn-lg"
                  href="#!"
                  role="button"
                >
                  Create Post
                </a>
              </div>
            </div>
          </div>
        </div>
        <input type="file" className="d-none" onChange={updateCover} />
      </label>
    </header>
  );
}
