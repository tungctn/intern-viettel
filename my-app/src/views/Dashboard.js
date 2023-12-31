import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import FormControl from "react-bootstrap/FormControl";

const Dashboard = () => {
  const {
    authState: {},
  } = useContext(AuthContext);

  const {
    postState: { post, posts, postsLoading },
    getOwnPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
    searchOwnPost,
  } = useContext(PostContext);

  useEffect(() => {
    getOwnPosts();
  }, []);

  let body = null;
  const [searchTerm, setSearchTerm] = useState("");

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (!posts) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddPostModal.bind(this, true)}>
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-1 g-4 mx-auto mt-3">
          {posts?.map((post) => (
            <Col className="my-2">
              <SinglePost post={post} page="dashboard" />
            </Col>
          ))}
        </Row>

        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}>
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      <FormControl
        style={{ width: "60%", margin: "auto", marginTop: "30px" }}
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          searchOwnPost(event.target.value);
        }}
      />
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide>
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
