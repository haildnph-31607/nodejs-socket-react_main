import { Stack } from "react-bootstrap";
import { userFetchRecipient } from "../../hooks/userFetchRecipient";
import avatar from "../../../public/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { unReadNotificationFunc } from "../../utils/unReadNotification";
import { useFetchLatesMessage } from "../../hooks/useFetchLateMessage";
import moment from 'moment'

const UserChat = ({ chat, user }) => {
  const { onlineUser ,notification,markThisUserNotifications} = useContext(ChatContext);
  const { recipientUser } = userFetchRecipient(chat, user);
  // const isOnline = onlineUser?.some((on)=>on?.userId === recipientUser?._id)
  const unReadNotification = unReadNotificationFunc(notification)
  const isOnline = onlineUser?.some((user)=>user.userId == recipientUser?._id)

  const thisUserNotification = unReadNotification?.filter(n=>n.senderId === recipientUser?._id)

  const {latestMessage} = useFetchLatesMessage(chat)
  const trunText = (text)=>{
    let shortText = text.substring(0,20);
    if(text.length > 20){
      shortText = shortText + '....'
    }
    return shortText
  }
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={()=>{
        if(thisUserNotification?.length !== 0){
          markThisUserNotifications(thisUserNotification,notification)
        }
      }}
    >
      <div className="d-felx">
        <div className="me-2">
          <img src={avatar} alt="" height={"35px"} />
        </div>
        <div className="name">{recipientUser?.name}</div>
        <div className="text">{latestMessage?.text && <span>{trunText(latestMessage?.text)}</span>}</div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">{moment(latestMessage?.updateAt).calendar()}</div>
      <div className={thisUserNotification?.length > 0 ? "this-user-notifications" : ''}>{thisUserNotification?.length > 0 ? thisUserNotification?.length : '' }</div>
        <div className={isOnline ? "user-online" : ""}></div>
      </div>
    </Stack>
  );
};

export default UserChat;
