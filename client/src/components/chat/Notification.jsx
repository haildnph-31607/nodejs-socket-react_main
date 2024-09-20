import { useContext, useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import { unReadNotificationFunc } from "../../utils/unReadNotification";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { userChats, notification, allUsers, maskAllNotificationAsRead ,markNotificationAsRead} =
    useContext(ChatContext);
  const unReadNotification = unReadNotificationFunc(notification);
  const modifiedNotification = notification.map((n) => {
    const sender = allUsers.find((user) => user._id == n.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  return (
    <div className="notifications">
      <div className="notifications-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-chat-right-dots-fill"
          viewBox="0 0 16 16"
          onClick={() => setIsOpen(!isOpen)}
        >
          <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
        </svg>
        {unReadNotification?.length === 0 ? null : (
          <span className="notification-count">
            {unReadNotification?.length}
          </span>
        )}
      </div>
      {isOpen ? (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>Notification</h3>
            <div
              className="mark-as-real"
              onClick={() => maskAllNotificationAsRead(notification)}
            >
              Mark all as read
            </div>
          </div>
          {modifiedNotification &&
            modifiedNotification?.map((n, index) => {
              return (
                <div
                  key={index}
                  className={
                    n.isRead ? "notification" : "notification not-read"
                  }
                  onClick={()=>markNotificationAsRead(n,userChats,user,notification)}
                >
                  <span>{`${n.senderName} send you a new messsage`}</span>
                  <span className="notification-time">
                    {moment(n.date).calendar()}
                  </span>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
