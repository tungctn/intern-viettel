import React, { useState } from "react";
import { Card, Button, Container, Row, Col, Image } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Spinner from "react-bootstrap/Spinner";

const Profile = () => {
  const {
    authState: {
      user: { username, email, img },
    },
    uploadImage,
  } = useContext(AuthContext);
  const user1 = {
    name: email,
    role: "Senior Journalist",
    avatar: img,
    articles: 41,
    followers: 976,
    rating: 8.5,
  };

  const [image, setImage] = useState(user1.avatar);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setLoading(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      uploadImage(formData)
        .then((response) => {
          console.log(response);
          // if (response.success) {
          setLoading(false);
          // }
        })
        .catch((error) => {
          console.log(error);
        });
      navigator.serviceWorker.addEventListener("message", (message) => {
        console.log(message);
        setLoading(false);
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center vh-100 vw-70"
      style={{ backgroundColor: "" }}>
      <Container className="">
        <Row className="mt-5">
          <Col>
            <Card style={{ borderRadius: "15px" }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <label htmlFor="image-upload">
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      <Image
                        style={{
                          width: "180px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        src={image}
                        alt="Generic placeholder image"
                        fluid
                      />
                      {loading && (
                        <div className="d-flex justify-content-center mt-2">
                          <Spinner animation="border" variant="info" />
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="flex-grow-1 ms-3 ml-4">
                    <Card.Title>{user1.name}</Card.Title>
                    <Card.Text>{user1.role}</Card.Text>

                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}>
                      <div>
                        <p className="small text-muted mb-1">Articles</p>
                        <p className="mb-0">{user1.articles}</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">{user1.followers}</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Rating</p>
                        <p className="mb-0">{user1.rating}</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <Button
                        variant="outline-primary"
                        className="me-1 flex-grow-1">
                        Chat
                      </Button>
                      <Button className="flex-grow-1">Follow</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
