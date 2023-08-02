import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";
import Image from "react-bootstrap/Image";

const randomStatus = () => {
  let arr = ["success", "warning", "danger"];
  let random = Math.floor(Math.random() * arr.length);
  return arr[random];
};

const SinglePost = ({
  post: { id, content, url, user, likes, createdAt },
  page,
}) => {
  console.log(Date.now());
  const timeAgo = Math.floor((Date.now() - createdAt) / (1000 * 60 * 60));
  return (
    <Card
      className="shadow"
      border={randomStatus()}
      style={{
        width: "60%",
        margin: "auto",
      }}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">
                <Image
                  src={user?.img}
                  roundedCircle
                  width={25}
                  height={25}
                  style={{
                    marginRight: 10,
                  }}
                />
                {user?.firstName} {user?.lastName}
              </p>
              <Badge pill variant={randomStatus()}>
                {timeAgo >= 1 && timeAgo < 24 && `${timeAgo} hours ago`}
                {timeAgo > 24 && `${Math.floor(timeAgo / 24)} days ago`}
                {timeAgo < 1 && "Just now"}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons id={id} likes={likes} page={page} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{content}</Card.Text>
        <Card.Img variant="top" src={url} />
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
