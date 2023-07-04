import React, { useState } from "react";
import { Card, Button, Container, Row, Col, Image } from "react-bootstrap";

export default function Profile() {
  const user = {
    name: "Danny McLoan",
    role: "Senior Journalist",
    avatar:
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
    articles: 41,
    followers: 976,
    rating: 8.5,
  };

  const [image, setImage] = useState(user.avatar);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
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
                    </label>
                  </div>

                  <div className="flex-grow-1 ms-3 ml-4">
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>{user.role}</Card.Text>

                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}>
                      <div>
                        <p className="small text-muted mb-1">Articles</p>
                        <p className="mb-0">{user.articles}</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">{user.followers}</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Rating</p>
                        <p className="mb-0">{user.rating}</p>
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
}
