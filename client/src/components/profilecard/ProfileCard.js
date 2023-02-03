import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

import "./profileCard.css";
import { Link } from "react-router-dom";

export default function PersonalProfile({ data }) {
  console.log("data", data);
  return (
    <section className="vh-100" style={{ backgroundColor: "#F4F5F7" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src={
                      data.image ||
                      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    }
                    alt="Avatar"
                    className="my-5 rounded-circle"
                    style={{ width: "80px", height: "80px" }}
                    fluid
                  />
                  <MDBTypography tag="h5">{data.name}</MDBTypography>
                  <MDBCardText>{data.title}</MDBCardText>
                  <Link to="/profile">
                    <MDBIcon far icon="edit mb-5" />
                  </Link>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.email}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.phone}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Likes</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.likes.map((item) => (
                            <span>{item} &nbsp;</span>
                          ))}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">About Me</MDBTypography>
                    <hr className="mt-0 mb-2" />

                    <MDBCardText className="text-muted">
                      {data.about}
                    </MDBCardText>
                    <MDBRow className="pt-1"></MDBRow>
                    <div className="d-flex justify-content-start">
                      {data.facebook && (
                        <a
                          href={data.facebook || "#facebook"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MDBIcon fab icon="facebook me-3" size="lg" />
                        </a>
                      )}
                      {data?.twitter && (
                        <a
                          href={data.twitter || "#twitter"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MDBIcon fab icon="twitter me-3" size="lg" />
                        </a>
                      )}
                      {data?.instagram && (
                        <a
                          href={data.instagram || "#instagram"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MDBIcon fab icon="instagram me-3" size="lg" />
                        </a>
                      )}
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
