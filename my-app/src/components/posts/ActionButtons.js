import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { PostContext } from "../../contexts/PostContext";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const ActionButtons = ({ id, likes, page }) => {
  const { deletePost, findPost, setShowUpdatePostModal, likePost } =
    useContext(PostContext);
  const { loadUser } = useContext(AuthContext);

  const choosePost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  return (
    <>
      <Button
        className="post-button"
        onClick={() => {
          likePost(id);
          loadUser();
        }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkMO5kUM9Ym5PggFKatlS6GFIj-rtDUgIqcQ&usqp=CAU"
          alt="delete"
          width="24"
          height="24"
        />
        <span
          style={{
            color: "#31a87e",
            marginLeft: "5px",
          }}>
          {likes?.length || 0}
        </span>
      </Button>
      {page === "dashboard" && (
        <Button className="post-button" onClick={deletePost.bind(this, id)}>
          <img src={deleteIcon} alt="delete" width="24" height="24" />
        </Button>
      )}
    </>
  );
};

export default ActionButtons;
