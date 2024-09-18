import { Stack } from "react-bootstrap";
import { userFetchRecipient } from "../../hooks/userFetchRecipient";
import avatar from "../../../public/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";

const UserChat = ({ chat, user }) => {
  const { onlineUser } = useContext(ChatContext);
  const { recipientUser } = userFetchRecipient(chat, user);
  const isOnline = onlineUser?.some((on)=>on?.userId === recipientUser?._id)
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-felx">
        <div className="me-2">
          <img src={avatar} alt="" height={"35px"} />
        </div>
        <div className="name">{recipientUser?.name}</div>
        <div className="text">message</div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">2024</div>
        <div className="this-user-notifications">2</div>
        <div className={isOnline ? "user-online" : ""}></div>
      </div>
    </Stack>
  );
};

export default UserChat;
