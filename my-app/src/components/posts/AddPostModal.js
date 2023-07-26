import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useRef, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
import Image from "react-bootstrap/Image";
import { AuthContext } from "../../contexts/AuthContext";

const AddPostModal = () => {
  // Contexts
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  const { uploadImage } = useContext(AuthContext);
  const fileInputRef = useRef();
  // State
  const [newPost, setNewPost] = useState({
    content: "",
    url: "",
  });
  const [content, setContent] = useState();
  const [Url, setUrl] = useState();

  const { title, description, url, source } = newPost;
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb2n4efMxVHZ8IghP_qJfj8Hw6bO6s9JVE8kbnvu8sw2X30G_pPgX5BVQYofCJTe1dG7E&usqp=CAU"
  );

  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddPostData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (Url === "") {
      setShowToast({
        show: true,
        message: "Please upload an image",
        type: "danger",
      });
      return;
    }
    console.log(Url);
    const response = await addPost({
      url: Url,
      content: content,
    });
    let { success, message } = response;
    resetAddPostData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      uploadImage(formData)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setUrl(response.url);
            setShowToast({
              show: true,
              message: response.message,
              type: "success",
            });
          } else {
            setUrl("");
            setShowToast({
              show: true,
              message: response.message,
              type: "danger",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const resetAddPostData = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
      source: "",
    });
    setShowAddPostModal(false);
  };

  return (
    <div className="py-2">
      <Modal
        show={showAddPostModal}
        onHide={closeDialog}
        style={{ padding: "20px" }}>
        <Modal.Header closeButton>
          <Modal.Title className="">Create Post</Modal.Title>
        </Modal.Header>
        <Form.Control
          placeholder="Content"
          as="textarea"
          rows={3}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          style={{
            width: "95%",
            margin: "auto",
            marginBottom: "20px",
            marginTop: "20px",
          }}
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
          onClick={() => {
            fileInputRef.current.click();
            console.log(image);
          }}
        />
        <Form.Control
          type="file"
          size="lg"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <Button
          variant="primary"
          type="submit"
          onClick={onSubmit}
          style={{ margin: "20px" }}>
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default AddPostModal;
